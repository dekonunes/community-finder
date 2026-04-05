import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Business | Community Finder",
  description: "Get your business listed on Community Finder. Reach customers from your cultural community in Sydney.",
};

const WHATSAPP_NUMBER = "61400000000";
const EMAIL = "hello@communityfinder.com.au";

const TEMPLATE_MESSAGE = encodeURIComponent(
  "Hi! I'd like to list my business on Community Finder.\n\n" +
  "Name:\nService (GP, Accountant, Lawyer, Migration Agent, Childcare, Restaurant):\n" +
  "Country of origin:\nLanguages spoken:\nPhone:\nEmail:\nWebsite:\nSuburb:\nAddress:\nShort bio:"
);

export default function ListYourBusinessPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">List Your Business</h1>
      <p className="mt-2 text-zinc-400">Get found by customers from your cultural community in Sydney. Listing is free.</p>

      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">How it works</h2>
        <ol className="list-inside list-decimal space-y-2 text-zinc-300">
          <li>Send us your business details via WhatsApp or email</li>
          <li>We review your listing (usually within 24-48 hours)</li>
          <li>Your profile goes live on Community Finder</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${TEMPLATE_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-green-600 py-4 text-center text-lg font-medium hover:bg-green-500">
          💬 WhatsApp Us
        </a>
        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("List my business on Community Finder")}&body=${TEMPLATE_MESSAGE}`} className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-4 text-center text-lg font-medium text-blue-400 hover:bg-zinc-700">
          📧 Email Us
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">What we need from you</h2>
        <ul className="mt-4 space-y-2 text-zinc-300">
          <li>✅ Your business name</li>
          <li>✅ Service type (GP, Accountant, Lawyer, Migration Agent, Childcare, Restaurant)</li>
          <li>✅ Country of origin</li>
          <li>✅ Languages you speak</li>
          <li>✅ Phone number</li>
          <li>✅ Email address</li>
          <li>✅ Website (optional)</li>
          <li>✅ Suburb and address</li>
          <li>✅ A short bio (2-3 sentences about your practice)</li>
        </ul>
      </div>
    </div>
  );
}
