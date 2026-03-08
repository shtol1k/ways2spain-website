'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, Instagram, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Note: Client components can't export metadata directly
// Metadata should be in a separate page.tsx with this component as child
// For now, using client component as page - consider refactoring

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Повідомлення надіслано!', {
          description: 'Ми зв\'яжемося з вами найближчим часом.',
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          status: "",
          message: "",
        });
      } else {
        throw new Error(data.error || 'Помилка при відправці');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Помилка', {
        description: error instanceof Error 
          ? error.message 
          : 'Не вдалося надіслати повідомлення. Спробуйте пізніше.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="mb-4">Зв&apos;яжіться з нами</h1>
            <p className="text-xl text-muted-foreground">
              Зв&apos;яжіться з нами з будь-яких питань щодо переїзду в Іспанію через Digital Nomad Visa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Consultation Block */}
              <div className="bg-gradient-to-r from-orange-500/10 to-yellow-400/10 rounded-xl p-6 border border-border shadow-elegant">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Безкоштовна консультація</h2>
                  <p className="text-muted-foreground mb-4">
                    Запишіться на безкоштовну консультацію та отримайте персональні рекомендації щодо вашого кейсу переїзду до Іспанії.
                  </p>
                  <a
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-background hover:bg-muted h-12 rounded-md px-8 shadow-elegant"
                  >
                    Записатись на безкоштовну консультацію
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="bg-card rounded-xl p-8 border border-border shadow-elegant">
                <h2 className="text-2xl font-bold mb-2">Форма зворотного зв&apos;язку</h2>
                <p className="text-muted-foreground mb-6">Відповідаємо протягом 24 годин в робочі дні.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ім&apos;я <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Іван Петренко"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ivan@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+34 00 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Ваш запит</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Оберіть запит" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="digital-nomad">Отримання візи Digital Nomad</SelectItem>
                          <SelectItem value="temporary-protection">Перехід з тимчасового захисту</SelectItem>
                          <SelectItem value="family-join">Приєднання члена сім&apos;ї</SelectItem>
                          <SelectItem value="visa-renewal">Продовження візи</SelectItem>
                          <SelectItem value="other">Інше</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Повідомлення <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Розкажіть детальніше про ваш кейс..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Відправка...' : 'Надіслати повідомлення'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Details */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-elegant">
                <h3 className="text-xl font-bold mb-6">Контактна інформація</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:ways2spain@gmail.com"
                        className="text-muted-foreground hover:text-secondary transition-smooth"
                      >
                        ways2spain@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Send className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Telegram</p>
                      <a
                        href="https://t.me/ways2spain_assistant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-secondary transition-smooth"
                      >
                        @ways2spain_assistant
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Send className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Канал новин</p>
                      <a
                        href="https://t.me/+FABp3kLbRt45NzFi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-secondary transition-smooth"
                      >
                        @ways2spain
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Instagram className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <a
                        href="https://www.instagram.com/ways2spain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-secondary transition-smooth"
                      >
                        @ways2spain
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Адреса</p>
                      <p className="text-muted-foreground">
                        Валенсія, Іспанія
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 text-primary-foreground">
                <h3 className="text-xl font-bold mb-4 color-content-primary-inverse">Графік роботи</h3>
                <div className="space-y-2 text-primary-foreground/90">
                  <div className="flex justify-between">
                    <span>Понеділок - П&apos;ятниця</span>
                    <span className="font-semibold">10:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Субота</span>
                    <span className="font-semibold">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Неділя</span>
                    <span className="font-semibold">Вихідний</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
