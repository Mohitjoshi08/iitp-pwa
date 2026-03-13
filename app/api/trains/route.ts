import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const direction = searchParams.get('direction') || 'BTA_PNBE';

  // A realistic schedule acting as a live API payload
  const trains = {
    BTA_PNBE: [
      { number: "13210", name: "Palamu Express", src: "Bihta", dst: "Patna", time: "05:15" },
      { number: "03204", name: "DDU - Patna MEMU", src: "Bihta", dst: "Patna", time: "08:20" },
      { number: "12334", name: "Vibhuti Express", src: "Bihta", dst: "Patna", time: "21:40" },
      { number: "13202", name: "LTT Patna Express", src: "Bihta", dst: "Patna", time: "22:15" },
      { number: "03294", name: "Ara - Patna MEMU", src: "Bihta", dst: "Patna", time: "10:10" },
      { number: "13228", name: "Intercity Express", src: "Bihta", dst: "Patna", time: "14:45" },
      { number: "13250", name: "Bhabua Patna Express", src: "Bihta", dst: "Patna", time: "16:20" },
      { number: "12368", name: "Vikramshila Express", src: "Bihta", dst: "Patna", time: "01:30" }
    ],
    PNBE_BTA: [
      { number: "13209", name: "Palamu Express", src: "Patna", dst: "Bihta", time: "20:15" },
      { number: "03203", name: "Patna - DDU MEMU", src: "Patna", dst: "Bihta", time: "16:40" },
      { number: "12333", name: "Vibhuti Express", src: "Patna", dst: "Bihta", time: "04:10" },
      { number: "13201", name: "Patna LTT Express", src: "Patna", dst: "Bihta", time: "23:55" },
      { number: "03293", name: "Patna - Ara MEMU", src: "Patna", dst: "Bihta", time: "08:30" },
      { number: "13227", name: "Intercity Express", src: "Patna", dst: "Bihta", time: "10:15" },
      { number: "13249", name: "Patna Bhabua Express", src: "Patna", dst: "Bihta", time: "05:30" },
      { number: "12367", name: "Vikramshila Express", src: "Patna", dst: "Bihta", time: "17:05" }
    ]
  };

  const data = trains[direction as keyof typeof trains] || trains['BTA_PNBE'];
  
  return NextResponse.json({ success: true, data });
}