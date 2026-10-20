"use client";

import RegistrationForm from "@/components/RegistrationForm";
import { MapPin, Calendar, Trophy, Clock, Users, ShieldAlert, Medal, Crown, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-400 selection:text-white">
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-forest-50 to-slate-50 -z-10 border-b border-forest-100" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16">
        <div className="flex justify-center mb-6 gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-forest-800 uppercase tracking-wider">
            <span>♛</span> Think • Plan • Move • Win <span>♚</span>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-forest-900 uppercase">
            Open Chess Tournament
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-600 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-forest-600" />
            LODHI GARDEN <span className="text-slate-300">|</span> 
            <span className="italic">Play Chess Amidst Nature</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <Calendar className="w-6 h-6 text-forest-600 mb-2" />
            <p className="text-sm font-bold text-slate-900">Sunday, 1st Nov</p>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">11 AM – 3 PM</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <Clock className="w-6 h-6 text-forest-600 mb-2" />
            <p className="text-sm font-bold text-slate-900">10 + 5 Rapid</p>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">Time Control</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-black text-forest-600 leading-none mb-1">₹149</div>
            <p className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Per Person</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-10 h-10 bg-red-100 rounded-full blur-xl"></div>
            <Users className="w-6 h-6 text-red-600 mb-2" />
            <p className="text-sm font-bold text-slate-900">Max. 45 Slots</p>
            <p className="text-[11px] text-red-500 uppercase font-bold">Strictly Limited</p>
          </div>
        </div>

        {/* Prize Pool Section */}
        <div className="max-w-5xl mx-auto mb-16 bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-forest-900 p-6 text-center text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-2">Total Prize Money</h2>
            <div className="text-5xl font-black text-white flex items-center justify-center gap-2">
              <Trophy className="w-10 h-10 text-orange-400" />
              ₹3400+
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* Open Category */}
            <div className="p-6">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                <Crown className="w-4 h-4 text-forest-600" /> Open Category
              </h3>
              <ul className="space-y-3">
                <li className="flex flex-col bg-orange-50 p-2.5 rounded-lg border border-orange-200 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold flex items-center gap-2 text-slate-800"><div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">1</div> 1st Place</span>
                    <span className="font-black text-forest-800 text-lg">₹1200</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase pl-7">Gold Medal</span>
                </li>
                <li className="flex flex-col bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold flex items-center gap-2 text-slate-700"><div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs">2</div> 2nd Place</span>
                    <span className="font-black text-forest-800 text-base">₹800</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase pl-7">Silver Medal</span>
                </li>
                <li className="flex flex-col bg-orange-50/50 p-2.5 rounded-lg border border-orange-200/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold flex items-center gap-2 text-slate-700"><div className="w-5 h-5 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs">3</div> 3rd Place</span>
                    <span className="font-black text-forest-800 text-base">₹600</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase pl-7">Bronze Medal</span>
                </li>
                <li className="flex flex-col bg-white p-2.5 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold flex items-center gap-2 text-slate-600"><div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs">4</div> 4th Place</span>
                    <span className="font-black text-forest-800 text-sm">₹400</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase pl-7">+ Commemorative Medal</span>
                </li>
              </ul>
            </div>
            
            {/* Youngest Talent Category */}
            <div className="p-6 flex flex-col justify-center items-center text-center bg-blue-50/30">
              <h3 className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-3">Youngest Talent</h3>
              <Sparkles className="w-10 h-10 text-blue-500 mb-2" />
              <p className="text-2xl font-black text-slate-800">₹200</p>
              <p className="text-sm font-bold text-blue-600">+ Gold Medal</p>
            </div>

            {/* Best Girl Category */}
            <div className="p-6 flex flex-col justify-center items-center text-center bg-pink-50/30">
              <h3 className="text-xs font-bold uppercase text-pink-600 tracking-wider mb-3">Best Girl</h3>
              <Trophy className="w-10 h-10 text-pink-500 mb-2" />
              <p className="text-2xl font-black text-slate-800">₹200</p>
              <p className="text-sm font-bold text-pink-600">+ Gold Medal</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-3">
            {/* The Form Component */}
            <RegistrationForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-forest-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-forest-600" />
                Rules & Legalities
              </h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <strong className="block text-red-600 font-bold">1. Strict 45-Player Limit</strong>
                  <p>To maintain tournament quality, entries will permanently close the moment we hit 45 successful registrations. Secure your spot immediately to avoid disappointment.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">2. Exact Payment Mandatory</strong>
                  <p>Any payment received that is less than the exact ₹149 entry fee will render the registration instantly invalid. Partial payments are strictly non-refundable and will not secure a seat.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">3. Fair Play & Arbiter Decisions</strong>
                  <p>Standard FIDE rules for Rapid Chess apply. Engine use or outside assistance will result in immediate disqualification. The on-site Arbiter's decision is final.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">4. Age & Gender Verification</strong>
                  <p>Players claiming the Youngest Talent or Best Girl prizes must present valid government ID (Aadhar/Birth Certificate) at the venue before the prize distribution.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">5. Media & Photography</strong>
                  <p>By registering, you consent to being photographed during the event for promotional materials under the "Good Moves Build Great Minds" campaign.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">6. Digital Certification</strong>
                  <p>All verified participants will receive an official E-Certificate of Participation sent directly to their registered email address online after the completion of the tournament.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-forest-900 text-forest-100 py-8 text-center border-t border-forest-800">
        <p className="text-sm font-semibold tracking-widest uppercase mb-2">♚ Good Moves Build Great Minds ♛</p>
        <p className="text-xs text-forest-400">Lodhi Garden Open Chess Championship © 2026</p>
      </footer>
    </main>
  );
}