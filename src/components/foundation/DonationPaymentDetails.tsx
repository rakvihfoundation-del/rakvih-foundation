export const donationUpiId = "8549942525@kotak";

const paymentDetails = [
  ["Account Number", "8549943535"],
  ["IFSC Code", "KKBK0008034"],
  ["UPI ID", donationUpiId],
  ["UPI Number", "8549942525"],
];

export default function DonationPaymentDetails() {
  return (
    <section aria-label="Payment details" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-neutral-800 dark:bg-[#141414] sm:p-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Payment details</h2>
      <dl className="mt-2 divide-y divide-slate-200 dark:divide-neutral-800">
        {paymentDetails.map(([label, value]) => (
          <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5 text-sm">
            <dt className="text-slate-600 dark:text-neutral-400">{label}</dt>
            <dd className="select-all font-semibold tabular-nums text-slate-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
