import { ComingSoonForm } from "@/components/coming-soon-form";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <img
            src="/logo.svg"
            alt="fastaf.sh logo"
            className="mx-auto h-10 w-auto"
          />
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto text-pretty">
            Winners <strong className="text-white">ship</strong> before their competition wakes up. TTM in 24h. Be
            first. Be fast. Be feared.
          </p>
        </div>

        <ComingSoonForm />

        <p className="text-sm text-muted-foreground">
          Built by killers. Join the waitlist and get early access • fastaf.sh
        </p>
      </div>
    </main>
  );
}
