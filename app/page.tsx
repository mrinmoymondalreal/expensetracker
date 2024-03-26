import { Metadata } from "next";
import Home from "@/components/Index"

export default function page() {
  return <Home />
}

export const metadata: Metadata = {
  title: {
    template: '%s | Expense Tracker',
    default: 'Expense Tracker',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
