import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/20">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Сторінку не знайдено</p>
        <Link href="/">
          <Button variant="hero" size="lg" asChild>
            <span>Повернутися на головну</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
