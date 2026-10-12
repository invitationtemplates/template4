import { useId, useState, type FormEvent, type ReactNode } from "react";
import ScrollPage from "../ui/ScrollPage";
import { AnimatePresence, motion } from "motion/react";
import { Send, User, Users } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { submitRsvp, type RsvpResult } from "../../lib/rsvp";
import { SectionHeading } from "../ui/Decor";

type Status = "idle" | "sending" | "done" | "error";

const initial = { name: "", guests: "1", attending: "yes" as "yes" | "no" };

const doneText: Record<RsvpResult["channel"], string> = {
  endpoint: "Your reply has been received. We look forward to celebrating with you.",
  whatsapp: "WhatsApp has opened with your reply ready to send. Please press send there to confirm.",
  none: "RSVP is not connected to a service yet, so this reply was not sent. Please contact the family directly.",
};

const errorText = "mt-1 pl-1 text-[14px] text-[#a3324f]";

/** A field with a small leading icon inside the rounded control. */
function Field({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold-deep">{icon}</span>
      {children}
    </div>
  );
}

/** RSVP: name, number of guests, a Yes / No choice and a send button; replies go through lib/rsvp.ts. */
export default function Rsvp({ rsvp }: { rsvp: InvitationConfig["rsvp"] }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<{ name?: string; guests?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RsvpResult | null>(null);

  const set = (k: keyof typeof initial, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    const g = Number(form.guests);
    if (form.attending === "yes" && (!Number.isInteger(g) || g < 1 || g > 20)) e.guests = "Please enter 1 to 20 guests";
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await submitRsvp(
        {
          name: form.name.trim(),
          phone: "",
          attending: form.attending === "yes",
          guests: form.attending === "yes" ? g : 0,
          dietary: "",
          message: "",
          submittedAt: new Date().toISOString(),
        },
        rsvp.whatsappNumber,
      );
      setResult(res);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <ScrollPage id="rsvp" tone="plain">
      <SectionHeading>{rsvp.heading}</SectionHeading>

      <motion.div
        className="mt-5 [perspective:900px]"
        initial={{ opacity: 0, rotateX: -65, y: 20 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        style={{ transformOrigin: "50% 0%" }}
      >
        <div className="paper-card mx-auto max-w-[360px] p-5">
          <AnimatePresence mode="wait">
            {status === "done" && result ? (
              <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="px-2 py-6 text-center">
                <p className="font-script text-[44px] leading-none text-maroon">Thank you!</p>
                <p className="mt-3 font-body text-[18px] font-medium leading-snug text-ink">{doneText[result.channel]}</p>
                <button
                  type="button"
                  className="mt-4 rounded-full border border-maroon px-5 py-1.5 font-body text-[16px] font-semibold text-maroon"
                  onClick={() => {
                    setForm(initial);
                    setStatus("idle");
                  }}
                >
                  Send another reply
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 gap-4">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
                    <label htmlFor={id("name")} className="sr-only">
                      Your Name
                    </label>
                    <Field icon={<User className="h-[18px] w-[18px]" />}>
                      <input id={id("name")} className="field" placeholder="Your Name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-e") : undefined} />
                    </Field>
                    {errors.name && (
                      <p id={id("name-e")} className={errorText}>
                        {errors.name}
                      </p>
                    )}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.65 }}>
                    <label htmlFor={id("guests")} className="sr-only">
                      Number of Guests
                    </label>
                    <Field icon={<Users className="h-[18px] w-[18px]" />}>
                      <input
                        id={id("guests")}
                        className="field disabled:opacity-50"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={20}
                        placeholder="Number of guests"
                        value={form.guests}
                        disabled={form.attending === "no"}
                        onChange={(e) => set("guests", e.target.value)}
                        aria-invalid={!!errors.guests}
                        aria-describedby={errors.guests ? id("guests-e") : undefined}
                      />
                    </Field>
                    {errors.guests && (
                      <p id={id("guests-e")} className={errorText}>
                        {errors.guests}
                      </p>
                    )}
                  </motion.div>
                </div>

                <motion.fieldset className="mt-6 flex items-center justify-between gap-3" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }}>
                  <legend className="sr-only">Will you be attending?</legend>
                  <span aria-hidden className="font-body text-[19px] font-semibold text-ink">
                    Will you be attending?
                  </span>
                  <div className="flex gap-2">
                    {(["yes", "no"] as const).map((v) => (
                      <label
                        key={v}
                        className={`cursor-pointer rounded-full border px-5 py-1.5 font-body text-[16px] font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
                          form.attending === v ? "border-maroon bg-maroon text-[#FFF3DE] shadow-soft" : "border-gold bg-[#FFFBF1] text-maroon"
                        }`}
                      >
                        <input type="radio" name={id("attending")} value={v} checked={form.attending === v} onChange={() => set("attending", v)} className="sr-only" />
                        {v === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                </motion.fieldset>

                {status === "error" && (
                  <p role="alert" className="mt-3 text-center text-[15px] text-[#a3324f]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <motion.button initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.95 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === "sending"} className="btn-maroon mt-6 w-full">
                  <Send className="h-[18px] w-[18px]" aria-hidden /> {status === "sending" ? "Sending…" : "Send RSVP"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </ScrollPage>
  );
}
