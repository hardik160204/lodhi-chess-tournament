"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase, Registration } from "@/lib/supabase";
import ReceiptPrinter from "./ReceiptPrinter";
import { QrCode, ShieldCheck, Loader2, ArrowRight, Copy, Check, Download } from "lucide-react";

export default function RegistrationForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", category: "Open", utr: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedRecord, setConfirmedRecord] = useState<Registration | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  // 🔴 CHANGE THIS NUMBER TO 10 FOR TESTING, OR LEAVE AT 55
  const PLAYER_LIMIT = 55;

  const upiId = "9310058789@ptsbi"; 
  const payeeName = "Saarang Dev"; 
  const amount = "149.00";
  const note = "Lodhi Chess Open Entry";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Fetch current registration count on load
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'CONFIRMED');
      if (count !== null) setSpotsRemaining(Math.max(0, PLAYER_LIMIT - count));
    };
    fetchCount();
  }, [PLAYER_LIMIT]);

  const handleProceedToPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    
    // Check Hard Cap before letting them pay
    setLoading(true);
    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'CONFIRMED');
    setLoading(false);
    
    if (count !== null && count >= PLAYER_LIMIT) {
      setErrorMsg(`Registration is strictly closed. We have reached our maximum capacity of ${PLAYER_LIMIT} players.`);
      return;
    }

    setErrorMsg("");
    setStep(2);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Convert SVG to PNG and download
  const handleDownloadQR = () => {
    const svg = document.getElementById("upi-qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "LodhiChess_QR.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
      // Final Cap Check on Insertion
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'CONFIRMED');
        
      if (count !== null && count >= PLAYER_LIMIT) throw new Error(`Registration is completely full (${PLAYER_LIMIT}/${PLAYER_LIMIT}).`);

      const { data, error } = await supabase.from("registrations").insert([{
        name: formData.name, phone: formData.phone, email: formData.email,
        fide_id: formData.category, amount: 149.0, utr: formData.utr.trim(), status: "PENDING",
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
      name: formData.name || "Test Player", phone: formData.phone || "9999999999", email: formData.email || "test@test.com", amount: 149.0, utr: formData.utr || "123456789012", status: "CONFIRMED", id: "EVT-8921"
    });
    setStep(4);
  };

  if (step === 4 && confirmedRecord) {
    return <ReceiptPrinter registration={confirmedRecord} onReset={() => { setFormData({ name: "", phone: "", email: "", category: "Open", utr: "" }); setStep(1); }} />;
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
      
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs sm:text-sm relative z-10">
        <span className={step >= 1 ? "text-forest-600 font-bold" : "text-slate-400"}>1. Details</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 2 ? "text-forest-600 font-bold" : "text-slate-400"}>2. Pay ₹149</span>
        <span className="text-slate-300">→</span>
        <span className={step >= 3 ? "text-forest-600 font-bold" : "text-slate-400"}>3. Confirmed</span>
      </div>

      {errorMsg && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium relative z-10">{errorMsg}</div>}

      {step === 1 && (
        <form onSubmit={handleProceedToPay} className="space-y-5 relative z-10">
          
          {/* Animated Urgency Banner */}
          {spotsRemaining !== null && spotsRemaining > 0 && (
            <div className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-black shadow-sm tracking-wide">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
              </span>
              {spotsRemaining > 30 
                ? "🔥 REGISTRATIONS LIVE — BOOK FAST!" 
                : `⚡ HURRY! ONLY ${spotsRemaining} SEATS LEFT!`}
            </div>
          )}
          {spotsRemaining === 0 && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-black shadow-sm text-center tracking-wide">
              🚫 REGISTRATION CLOSED ({PLAYER_LIMIT}/{PLAYER_LIMIT} FILLED)
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Full Name *</label>
            <input type="text" required placeholder="e.g. Rahul Sharma" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 placeholder-slate-400 transition-all cursor-text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">WhatsApp *</label>
              <input type="tel" required placeholder="e.g. 9876543210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-900 placeholder-slate-400 transition-all cursor-text" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-900 transition-all cursor-pointer">
                <option value="Open">Open</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email Address *</label>
            <input type="email" required placeholder="e.g. rahul@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-900 placeholder-slate-400 transition-all cursor-text" />
          </div>

          <button 
            type="submit" 
            disabled={loading || spotsRemaining === 0} 
            className="w-full mt-2 py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none text-white font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Proceed to Pay ₹149</span><ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm">
            <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-800">Exact Payment Warning</p>
              <p className="text-red-700 mt-1 leading-relaxed">UPI shows <span className="font-bold">{payeeName}</span>. Any payment strictly less than ₹149 will automatically invalidate your registration.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <QRCodeSVG id="upi-qr-code" value={upiUrl} size={160} level="M" />
            <div className="flex items-center gap-2 mt-4">
              <p className="text-slate-600 font-medium text-xs flex items-center gap-1.5">
                <QrCode className="w-4 h-4" /> Scan QR from any UPI App
              </p>
              <span className="text-slate-300">|</span>
              <button type="button" onClick={handleDownloadQR} className="cursor-pointer text-xs font-bold text-forest-600 hover:text-forest-800 flex items-center gap-1 transition-colors">
                <Download className="w-3.5 h-3.5" /> Save QR
              </button>
            </div>
            
            <div className="w-full flex items-center gap-4 my-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">OR</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="w-full flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official UPI ID</span>
                <span className="font-mono text-sm font-bold text-slate-800 truncate">{upiId}</span>
              </div>
              <button 
                type="button" 
                onClick={handleCopyUpi} 
                className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
              >
                {copiedUpi ? <><Check className="w-3.5 h-3.5 text-forest-600" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitUTR} className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 text-center">Enter 12-Digit UTR Ref No.</label>
              <input type="text" required maxLength={12} minLength={12} placeholder="e.g. 428901238472" value={formData.utr} onChange={(e) => setFormData({ ...formData, utr: e.target.value.replace(/\D/g, "") })} className="w-full bg-white border-2 border-slate-200 focus:border-orange-400 rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-widest text-forest-900 placeholder-slate-300 transition-colors outline-none cursor-text" />
            </div>
            <button 
              type="submit" 
              disabled={loading || formData.utr.length !== 12} 
              className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : <span>Submit & Get Entry Pass</span>}
            </button>
          </form>
          <button type="button" onClick={() => setStep(1)} className="cursor-pointer w-full text-center text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">← Back to Edit Details</button>
        </div>
      )}

      {step === 3 && (
        <div className="py-12 flex flex-col items-center text-center relative z-10">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
          <h3 className="font-bold text-lg text-slate-800">Verifying Payment...</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-[250px]">Matching your UTR ({formData.utr}) with our bank system. Keep this window open.</p>
          <button type="button" onClick={triggerDemoConfirmation} className="cursor-pointer text-xs text-slate-400 hover:text-orange-500 underline mt-8 transition-colors">(Dev test: Force Confirm)</button>
        </div>
      )}
    </div>
  );
}