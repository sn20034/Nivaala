import OrderStepper from '@/components/forms/OrderStepper';

export default function Order() {
  return (
    <div className="bg-cream dark:bg-ink px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="eyebrow">Join Nivaala</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tightest sm:text-4xl">
            Your first box, / <span className="gradient-text">on its way.</span>
          </h1>
        </div>
        <OrderStepper />
      </div>
    </div>
  );
}
