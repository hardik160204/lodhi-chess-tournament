"use client";

import RegistrationForm from "@/components/RegistrationForm";
import { MapPin, Calendar, Trophy, Clock, Users, ShieldAlert, Medal, Crown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-gold-400 selection:text-forest-900">
      {/* Nature-inspired background pattern */}
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-forest-50 to-slate-50 -z-10 border-b border-forest-100" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-16">
        
        {/* Header Badges */}
        <div className="flex justify-center mb-6 gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-forest-800 uppercase tracking-wider">
            <span>♛</span> Think • Plan • Move • Win <span>♚</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-forest-900 uppercase">
            Chess Tournament
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-600 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-forest-600" />
            LODHI GARDEN <span className="text-slate-300">|</span> 
            <span className="italic">Play Chess Amidst Nature</span>
          </p>
        </div>

        {/* 4-Pill Event Stats */}
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
            <div className="text-2xl font-black text-forest-600 leading-none mb-1">₹99</div>
            <p className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Per Person</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-10 h-10 bg-gold-100 rounded-full blur-xl"></div>
            <Users className="w-6 h-6 text-forest-600 mb-2" />
            <p className="text-sm font-bold text-slate-900">Min. 30</p>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">Registrations</p>
          </div>
        </div>

        {/* Minimum 30 Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-3 flex items-center justify-center gap-3 text-gold-600 text-sm font-semibold shadow-sm">
            <ShieldAlert className="w-5 h-5" />
            <p>Risk-Free Entry: If 30 registrations are not completed, 100% of the fees will be refunded.</p>
          </div>
        </div>

        {/* Prize Pool Section */}
        <div className="max-w-4xl mx-auto mb-16 bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-forest-900 p-6 text-center text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-2">Total Prize Money</h2>
            <div className="text-5xl font-black text-white flex items-center justify-center gap-2">
              <Trophy className="w-10 h-10 text-gold-400" />
              ₹2500
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* General Category */}
            <div className="p-6">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                <Crown className="w-4 h-4 text-forest-600" /> General Category
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center bg-gold-50 p-2 rounded-lg border border-gold-100">
                  <span className="font-bold flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-gold-400 text-white flex items-center justify-center text-xs">1</div> 1st Place</span>
                  <span className="font-black text-forest-800">₹1000</span>
                </li>
                <li className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="font-bold flex items-center gap-2 text-slate-700"><div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs">2</div> 2nd Place</span>
                  <span className="font-black text-forest-800">₹700</span>
                </li>
                <li className="flex justify-between items-center bg-orange-50 p-2 rounded-lg border border-orange-100">
                  <span className="font-bold flex items-center gap-2 text-slate-700"><div className="w-5 h-5 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs">3</div> 3rd Place</span>
                  <span className="font-black text-forest-800">₹400</span>
                </li>
              </ul>
            </div>
            
            {/* Under 12 Category */}
            <div className="p-6 flex flex-col justify-center items-center text-center bg-blue-50/30">
              <h3 className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-3">Under 12 Best Player</h3>
              <Medal className="w-10 h-10 text-blue-500 mb-2" />
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

        {/* Main Content Layout: Form & T&C */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="lg:col-span-3">
            <RegistrationForm />
          </div>

          {/* Right Column: Terms & Conditions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-forest-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-forest-600" />
                Rules & Legalities
              </h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <strong className="block text-slate-800">1. The "30-Player" Guarantee</strong>
                  <p>To ensure a competitive prize pool, the tournament requires a minimum of 30 registered players. If the threshold is not met by 31st October, 100% of your ₹99 entry fee will be refunded back to your source account automatically.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">2. Player Cancellations</strong>
                  <p>Once registered, fees are strictly non-refundable if the player drops out or fails to attend, unless the tournament is cancelled by the organizers.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">3. Fair Play & Arbiter Decisions</strong>
                  <p>Standard FIDE rules for Rapid Chess apply. Engine use or outside assistance will result in immediate disqualification and a ban. The on-site Arbiter's decision in any dispute is final and legally binding.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">4. Under-12 & Female Verification</strong>
                  <p>Players claiming the Under-12 or Best Girl prizes must present valid government ID (Aadhar) indicating age/gender at the venue before the prize distribution.</p>
                </div>
                <div>
                  <strong className="block text-slate-800">5. Media & Photography</strong>
                  <p>By registering, you consent to being photographed during the event for promotional materials under the "Good Moves Build Great Minds" campaign.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-forest-900 text-forest-100 py-8 text-center border-t border-forest-800">
        <p className="text-sm font-semibold tracking-widest uppercase mb-2">♚ Good Moves Build Great Minds ♛</p>
        <p className="text-xs text-forest-400">Lodhi Garden Open Chess Championship © 2026</p>
      </footer>
    </main>
  );
}