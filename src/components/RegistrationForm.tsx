"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase, Registration } from "@/lib/supabase";
import ReceiptPrinter from "./ReceiptPrinter";
import { Smartphone, QrCode, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function RegistrationForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", fide_id: "", utr: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedRecord, setConfirmedRecord] = useState<Registration | null>(null);

  const upiId = "yourname@bank"; 
  const payeeName = "Tournament Director"; 
  const amount = "99.00";
  const note = `LodhiChess-${formData.name.trim().replace(/\s+/g, "") || "Pass"}`;
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  const handleProceedToPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg("Please fill in required fields.");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleSubmitUTR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.utr.trim().length !== 12) {
      setErrorMsg("Please enter a valid 12-digit UTR.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.from("registrations").insert([{
        name: formData.name, phone: formData.phone, email: formData.email,
        fide_id: formData.fide_id || null, amount: 99.0, utr: formData.utr.trim(), status: "PENDING",
      }]).select().single();

      if (error) throw error;
      setStep(3);
      listenForVerification(data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const listenForVerification = (registrationId: string) => {
    const channel = supabase.channel(`reg-${registrationId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "registrations", filter: `id=eq.${registrationId}` },
        (payload) => {
          const updated = payload.new as Registration;
          if (updated.status === "CONFIRMED") {
            setConfirmedRecord(updated);
            setStep(4);
            supabase.removeChannel(channel);
          }
        }
      ).subscribe();
  };

  const triggerDemoConfirmation = () => {
    setConfirmedRecord({
      name: formData.name || "Test Player", phone: formData.phone || "9999999999", email: formData.email || "test@test.com", amount: 99.0, utr: formData.utr || "123456789012", status: "CONFIRMED", id: "EVT-8921"
    });
    setStep(4);
  };

  if (step === 4 && confirmedRecord) {
    return <ReceiptPrinter registration={confirmedRecord} onReset={() => { setFormData({ name: "", phone: "", email: "", fide_id: "", utr: "" }); setStep(1); }} />;
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs sm:text-sm">
        <span className={step >= 1 ? "text-forest-600 font-bold" : "text-slate-400"}>1. Details</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 2 ? "text-forest-600 font-bold" : "text-slate-400"}>2. Pay ₹99</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 3 ? "text-forest-600 font-bold" : "text-slate-400"}>3. Confirmed</span>
      </div>

      {errorMsg && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">{errorMsg}</div>}

      {step === 1 && (
        <form onSubmit={handleProceedToPay} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Full Name *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-slate-900 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">WhatsApp *</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 text-slate-900 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Category Age</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 text-slate-900 transition-all">
                <option>General</option>
                <option>Under 12</option>
                <option>Female (Best Girl)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email Address *</label>
            <input type="email" required placeholder="To receive the entry pass" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 text-slate-900 transition-all" />
          </div>

          <button type="submit" className="w-full mt-4 py-3.5 px-4 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-forest-600/30">
            <span>Proceed to Pay ₹99</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            <ShieldCheck className="w-5 h-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Payment to Organizer</p>
              <p className="text-slate-500 mt-1 leading-relaxed">UPI will show as <span className="font-bold text-slate-700">{payeeName}</span>. Your fee is fully protected by the 30-player refund guarantee.</p>
            </div>
          </div>

          <div className="block sm:hidden">
            <a href={upiUrl} className="w-full py-3.5 px-4 bg-[#1b4d3e] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-forest-900/20 active:scale-[0.98] transition-transform">
              <Smartphone className="w-4 h-4" /> Tap to Pay via UPI App
            </a>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <QRCodeSVG value={upiUrl} size={160} level="M" />
            <p className="text-slate-600 font-medium text-xs mt-4 flex items-center gap-1.5"><QrCode className="w-4 h-4" /> Scan with any UPI App</p>
          </div>

          <form onSubmit={handleSubmitUTR} className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 text-center">Enter 12-Digit UTR Ref No.</label>
              <input type="text" required maxLength={12} minLength={12} placeholder="e.g. 428901238472" value={formData.utr} onChange={(e) => setFormData({ ...formData, utr: e.target.value.replace(/\D/g, "") })} className="w-full bg-white border-2 border-slate-200 focus:border-forest-500 rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-widest text-forest-900 placeholder-slate-300 transition-colors outline-none" />
            </div>
            <button type="submit" disabled={loading || formData.utr.length !== 12} className="w-full py-3.5 px-4 bg-gold-500 hover:bg-gold-400 disabled:bg-slate-200 disabled:text-slate-400 text-forest-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : <span>Submit & Get Entry Pass</span>}
            </button>
          </form>
          <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm font-medium text-slate-400 hover:text-slate-600">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="py-12 flex flex-col items-center text-center">
          <Loader2 className="w-10 h-10 text-forest-600 animate-spin mb-4" />
          <h3 className="font-bold text-lg text-slate-800">Verifying Payment...</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-[250px]">Matching your UTR ({formData.utr}) with our bank system. Keep this window open.</p>
          <button type="button" onClick={triggerDemoConfirmation} className="text-xs text-slate-400 hover:text-forest-600 underline mt-8">(Dev test: Force Confirm)</button>
        </div>
      )}
    </div>
  );
}