"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlacklistItem } from "@/lib/types/api";

const blacklistFormSchema = z.object({
  adi: z.string().min(1, "Adı gereklidir"),
  soy: z.string().min(1, "Soyadı gereklidir"),
  aciklama: z.string().min(1, "Açıklama gereklidir"),
  tcno: z.string().optional(),
  kimlik_no: z.string().optional(),
  dogum_tarihi: z.string().optional(),
  sistem_grubu: z.string().optional(),
  otel_kodu: z.string().optional(),
  ulke_xml: z.string().optional(),
  kulanici: z.string().optional(),
  acenta: z.string().optional(),
  xml_kodu: z.string().optional(),
  ulke_adi: z.string().optional(),
});

type BlacklistFormData = z.infer<typeof blacklistFormSchema>;

interface BlacklistFormDialogProps {
  mode: "create" | "edit";
  item?: BlacklistItem;
  onSubmit: (data: BlacklistFormData) => Promise<void>;
  isLoading?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BlacklistFormDialog({
  mode,
  item,
  onSubmit,
  isLoading = false,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: BlacklistFormDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const form = useForm<BlacklistFormData>({
    resolver: zodResolver(blacklistFormSchema),
    defaultValues: {
      adi: item?.Adi || "",
      soy: item?.Soy || "",
      aciklama: item?.Aciklama || "",
      tcno: item?.Tcno || "",
      kimlik_no: item?.Kimlik_no || "",
      dogum_tarihi: item?.Dogum_tarihi ? item.Dogum_tarihi.split("T")[0] : "",
      sistem_grubu: item?.Sistem_grubu || "",
      otel_kodu: item?.Otel_kodu || "",
      ulke_xml: item?.Ulke_xml || "",
      kulanici: item?.Kulanici || "",
      acenta: item?.Acenta || "",
      xml_kodu: item?.["Xml Kodu"] || "",
      ulke_adi: item?.["ULke Adı"] || "",
    },
  });

  // Reset form when item changes (for edit mode)
  React.useEffect(() => {
    if (item) {
      form.reset({
        adi: item.Adi,
        soy: item.Soy,
        aciklama: item.Aciklama,
        tcno: item.Tcno || "",
        kimlik_no: item.Kimlik_no || "",
        dogum_tarihi: item.Dogum_tarihi ? item.Dogum_tarihi.split("T")[0] : "",
        sistem_grubu: item.Sistem_grubu || "",
        otel_kodu: item.Otel_kodu || "",
        ulke_xml: item.Ulke_xml || "",
        kulanici: item.Kulanici || "",
        acenta: item.Acenta || "",
        xml_kodu: item["Xml Kodu"] || "",
        ulke_adi: item["ULke Adı"] || "",
      });
    }
  }, [item, form]);

  const handleSubmit = async (data: BlacklistFormData) => {
    try {
      await onSubmit(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isEditMode = mode === "edit";
  const title = isEditMode
    ? "Kara Liste Kaydını Düzenle"
    : "Yeni Kara Liste Kaydı";
  const description = isEditMode
    ? "Mevcut kara liste kaydını düzenleyin."
    : "Yeni bir kara liste kaydı ekleyin.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="adi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Adı girin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyadı</FormLabel>
                  <FormControl>
                    <Input placeholder="Soyadı girin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aciklama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Açıklama girin"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tcno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TC No</FormLabel>
                    <FormControl>
                      <Input placeholder="TC No girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kimlik_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kimlik No</FormLabel>
                    <FormControl>
                      <Input placeholder="Kimlik No girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dogum_tarihi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doğum Tarihi</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sistem_grubu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sistem Grubu</FormLabel>
                    <FormControl>
                      <Input placeholder="Sistem Grubu girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="otel_kodu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otel Kodu</FormLabel>
                    <FormControl>
                      <Input placeholder="Otel Kodu girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ulke_xml"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ülke XML</FormLabel>
                    <FormControl>
                      <Input placeholder="Ülke XML girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="kulanici"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı</FormLabel>
                    <FormControl>
                      <Input placeholder="Kullanıcı girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acenta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acenta</FormLabel>
                    <FormControl>
                      <Input placeholder="Acenta girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="xml_kodu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>XML Kodu</FormLabel>
                    <FormControl>
                      <Input placeholder="XML Kodu girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ulke_adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ülke Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Ülke Adı girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Kaydediliyor..."
                  : isEditMode
                  ? "Güncelle"
                  : "Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
