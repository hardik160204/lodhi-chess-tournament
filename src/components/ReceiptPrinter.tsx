"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";
import { Printer, Scissors, Copy, Check, ShieldCheck } from "lucide-react";

interface ReceiptProps {
  registration: {
    id?: string;
    name: string;
    phone: string;
    email: string;
    fide_id?: string;
    amount: number;
    utr: string;
    created_at?: string;
  };
  onReset?: () => void;
}

export default function ReceiptPrinter({ registration, onReset }: ReceiptProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Fire celebratory confetti burst upon verified payment
    const end = Date.now() + 1.2 * 1000;
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const handleCopy = () => {
    const text = `Lodhi Garden Open Chess Entry Pass\nPlayer: ${registration.name}\nTicket ID: ${registration.id || "PENDING"}\nStatus: CONFIRMED`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  
  // Data embedded inside the Venue QR Code
  const ticketId = registration.id ? registration.id.split('-')[0].toUpperCase() : "PENDING";
  const qrPayload = JSON.stringify({
    event: "LODHI_CHESS_OPEN",
    id: ticketId,
    name: registration.name,
    utr: registration.utr
  });

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 px-2">
      {/* Responsive 3D Thermal Printer Slot */}
      <div className="relative z-20 w-[95%] max-w-[340px] h-10 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-950 rounded-2xl shadow-2xl border border-zinc-700/60 flex items-center justify-center px-4">
        <div className="w-full h-2.5 bg-black rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border-b border-zinc-700/50" />
      </div>

      {/* Overflow container masking the sliding receipt */}
      <div className="w-full -mt-2 overflow-hidden flex justify-center pb-6">
        <motion.div
          initial={{ y: -650, opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 22, stiffness: 85, duration: 1.5 }}
          className="relative w-[88%] max-w-[310px] bg-[#fdfdfd] text-zinc-800 font-mono text-xs shadow-2xl border-x border-zinc-200"
          style={{ filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.15))" }}
        >
          <div className="p-5 sm:p-6 pb-4">
            
            {/* Header */}
            <div className="text-center pb-4 border-b border-dashed border-zinc-300">
              <div className="flex justify-center items-center gap-1.5 text-zinc-900 font-bold text-sm tracking-wide">
                <span>♛</span> LODHI OPEN CHESS <span>♚</span>
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                Tournament Entry Pass
              </p>
            </div>

            {/* Metadata + Rubber Stamp */}
            <div className="relative pt-4 pb-3 border-b border-dashed border-zinc-300">
              <motion.div
                initial={{ scale: 2.8, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 0.9, rotate: -16 }}
                transition={{ delay: 0.9, type: "spring", damping: 12, stiffness: 220 }}
                className="absolute right-0 top-3 border-2 border-red-600 rounded px-2.5 py-1 text-center pointer-events-none select-none z-10"
              >
                <span className="text-red-600 font-black text-sm tracking-widest block leading-none">PAID</span>
                <span className="text-[8px] text-red-500 font-bold tracking-tight block mt-0.5">{formattedDate}</span>
              </motion.div>

              <div className="space-y-1.5 text-[11px]">
                <div><span className="text-zinc-400">PLAYER: </span><span className="font-bold text-zinc-900 uppercase">{registration.name}</span></div>
                <div><span className="text-zinc-400">PHONE: </span><span className="text-zinc-700">{registration.phone}</span></div>
                <div><span className="text-zinc-400">UTR REF: </span><span className="font-bold text-zinc-800 break-all">{registration.utr}</span></div>
                {registration.fide_id && (
                  <div><span className="text-zinc-400">CHESS ID: </span><span className="text-zinc-700">{registration.fide_id}</span></div>
                )}
              </div>

              {/* Amount Display */}
              <div className="mt-4 pt-3 border-t border-dotted border-zinc-200">
                <div className="text-2xl font-black tracking-tight text-zinc-900">₹{registration.amount.toFixed(2)}</div>
                <div className="text-[9px] text-zinc-400 uppercase tracking-wider">{formattedDate} | INVOICE VERIFIED</div>
              </div>
            </div>

            {/* Scannable Venue QR Code Segment */}
            <div className="pt-5 pb-1 flex flex-col items-center">
              <div className="bg-white p-2 border border-zinc-200 rounded-lg shadow-sm">
                <QRCodeSVG value={qrPayload} size={100} level="M" />
              </div>
              <p className="text-[11px] text-zinc-900 font-bold mt-3 uppercase tracking-wider">
                TICKET: {ticketId}
              </p>
              <p className="text-[9px] text-zinc-400 mt-1 tracking-widest uppercase">
                Scan at Venue Entry
              </p>
            </div>
          </div>

          {/* Thermal Saw-Tooth Tear Edge */}
          <div
            className="w-full h-4 bg-repeat-x"
            style={{
              backgroundColor: "#fdfdfd",
              backgroundImage: `radial-gradient(circle, transparent, transparent 50%, #fdfdfd 50%, #fdfdfd 100%), linear-gradient(135deg, transparent 75%, #fdfdfd 75%), linear-gradient(225deg, transparent 75%, #fdfdfd 75%)`,
              backgroundSize: "12px 12px",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 65%, 97.5% 100%, 95% 65%, 92.5% 100%, 90% 65%, 87.5% 100%, 85% 65%, 82.5% 100%, 80% 65%, 77.5% 100%, 75% 65%, 72.5% 100%, 70% 65%, 67.5% 100%, 65% 65%, 62.5% 100%, 60% 65%, 57.5% 100%, 55% 65%, 52.5% 100%, 50% 65%, 47.5% 100%, 45% 65%, 42.5% 100%, 40% 65%, 37.5% 100%, 35% 65%, 32.5% 100%, 30% 65%, 27.5% 100%, 25% 65%, 22.5% 100%, 20% 65%, 17.5% 100%, 15% 65%, 12.5% 100%, 10% 65%, 7.5% 100%, 5% 65%, 2.5% 100%, 0% 65%)",
            }}
          />
        </motion.div>
      </div>

      {/* Post-Print Success Text */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="text-center mt-2 mb-4 px-4">
        <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-lg">
          <ShieldCheck className="w-5 h-5" />
          <span>Payment Verified</span>
        </div>
        <p className="text-[11px] text-zinc-400 mt-1 max-w-[280px] mx-auto">
          Seat allocated! You will receive a copy via email shortly.
        </p>
      </motion.div>

      {/* Mobile-Friendly Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }} className="flex flex-wrap items-center justify-center gap-2 px-2 w-full max-w-[340px]">
        <button onClick={handlePrint} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 rounded-lg text-xs font-medium transition">
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
        <button onClick={handleCopy} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 rounded-lg text-xs font-medium transition">
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy Pass</span></>
          )}
        </button>
        {onReset && (
          <button onClick={onReset} className="w-full flex justify-center items-center gap-1.5 px-3 py-2.5 mt-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/80 rounded-lg text-xs font-medium transition">
            <Scissors className="w-3.5 h-3.5" />
            <span>Register Another Player</span>
          </button>
        )}
      </motion.div>
    </div>
  );
}