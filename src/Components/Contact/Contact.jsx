export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 lg:px-10 lg:pt-14">
      <div className="mx-auto mb-8 max-w-2xl text-center">
         <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Contact
        </h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">
          Have a project in mind or want to connect? Send a message and I&apos;ll get back to you soon.
        </p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[linear-gradient(135deg,var(--surface-elevated),var(--surface-muted))] p-5 shadow-[0_18px_50px_var(--shadow-soft)] sm:p-7 lg:p-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="Tell me about your idea..."
                className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="submit"
              className="inline-flex w-full max-w-[220px] items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}