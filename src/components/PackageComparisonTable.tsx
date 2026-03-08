'use client';

import { Fragment } from "react";

import { Icon } from "@/components/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CellValue =
  | { type: "check" }
  | { type: "x" }
  | { type: "text"; content: string };

type ServiceRow = {
  name: string;
  tooltip?: string;
  consultation: CellValue;
  basic: CellValue;
  standard: CellValue;
  premium: CellValue;
};

type ServiceGroup = {
  title: string;
  rows: ServiceRow[];
};

const CHECK: CellValue = { type: "check" };
const X: CellValue = { type: "x" };
const T = (content: string): CellValue => ({ type: "text", content });

const serviceGroups: ServiceGroup[] = [
  {
    title: "Загальні умови",
    rows: [
      {
        name: "Вартість на заявника",
        consultation: T("Безкоштовно"),
        basic: T("€300"),
        standard: T("€1,000"),
        premium: T("€1,500"),
      },
      {
        name: "Додатковий член родини",
        consultation: X,
        basic: T("-"),
        standard: T("€300"),
        premium: T("€300"),
      },
      {
        name: "Діти до 18 років",
        consultation: X,
        basic: T("-"),
        standard: T("Безкоштовно"),
        premium: T("Безкоштовно"),
      },
      {
        name: "Передоплата",
        consultation: X,
        basic: T("100%"),
        standard: T("50%"),
        premium: T("50%"),
      },
    ],
  },
  {
    title: "Консультації та інструменти",
    rows: [
      {
        name: "Консультація",
        consultation: T("30 хв (разова)"),
        basic: T("до 2 год"),
        standard: T("до 6 годин"),
        premium: T("Необмежено"),
      },
      {
        name: "Персоналізований чек-лист документів",
        consultation: X,
        basic: CHECK,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Адаптаційний гайд по адаптації в Іспанії",
        consultation: CHECK,
        basic: CHECK,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Доступ до внутрішньої системи відслідковування статусу документів",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
    ],
  },
  {
    title: "Підготовка документів",
    rows: [
      {
        name: "Координація отримання декларації про в’їзд (Declaración de Entrada)",
        tooltip: "Інструкції, заповнення декларацій",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Контакти перевірених присяжних перекладачів та нотаріусів",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Координація легалізації та присяжного перекладу",
        tooltip: "Послуги зовнішніх підрядників сплачуються окремо",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Заповнення всіх анкет і декларацій",
        tooltip: "Tasa, MIT, MIF, декларація про відсутність судимості, декларація про діючі родинні зв’язки тощо",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Отримання цифрового підпису",
        tooltip: "Запис на послугу та інструкція — особиста присутність обов’язкова",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Адаптація або підготовка документів",
        tooltip: "Контракти, інвойси, листи від компанії",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Переклад документів на іспанську мову",
        tooltip: "Документи, що не потребують присяжного перекладу",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
    ],
  },
  {
    title: "Подача та супровід",
    rows: [
      {
        name: "Оплата мита за розгляд Tasa 790 038",
        tooltip: "Вартість мита сплачується окремо",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Подача документів із нашим цифровим підписом та щоденне відслідковування статусу",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Розробка стратегії відповіді у разі дозапиту",
        consultation: X,
        basic: CHECK,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Повернення коштів у разі відмови або безкоштовна переподача",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
    ],
  },
  {
    title: "Після отримання резидентства",
    rows: [
      {
        name: "Запис на здачу відбитків для отримання ТІЕ",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Заповнення документів для отримання ТІЕ",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Відслідковування статусу готовності та запис на забір готової карти",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Допомога з відкриттям банківського рахунку",
        tooltip: "Запис, інструкції, контакти англомовних менеджерів",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Допомога з реєстрацією autónomo",
        tooltip: "Індивідуальний підприємець (ФОП)",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Отримання номеру NUSS та допомога з реєстрацією в системі соціального страхування RETA",
        consultation: X,
        basic: X,
        standard: CHECK,
        premium: CHECK,
      },
      {
        name: "Допомога з рахунком у випадку відсутності власного для реєстрації autónomo",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Запис на отримання реєстрації місця проживання (Padrón)",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
      {
        name: "Супровід реєстрації автомобіля в Іспанії",
        tooltip: "Анкети, записи, податкові процедури, DGT (Оплата супутніх послуг окремо)",
        consultation: X,
        basic: X,
        standard: X,
        premium: CHECK,
      },
    ],
  },
];

const plans = [
  { key: "consultation" as const, label: "Консультація", popular: false },
  { key: "basic" as const, label: "Базовий", popular: false },
  { key: "standard" as const, label: "Стандарт", popular: true },
  { key: "premium" as const, label: "Преміум", popular: false },
];

function CellContent({ value }: { value: CellValue }) {
  if (value.type === "check") {
    return (
      <Icon
        name="circleCheckSolid"
        size="md"
        className="color-content-positive mx-auto"
      />
    );
  }
  if (value.type === "x") {
    return (
      <Icon
        name="xmark"
        size="md"
        className="color-content-tertiary mx-auto"
      />
    );
  }
  return (
    <span className="text-body-small color-content-secondary text-center block">
      {value.content}
    </span>
  );
}

function ServiceNameCell({
  name,
  tooltip,
}: {
  name: string;
  tooltip?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-body-small color-content-secondary">{name}</span>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="color-content-tertiary hover:color-content-secondary transition-smooth shrink-0"
              aria-label="Детальніше"
            >
              <Icon name="info" size="md" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-center">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export function PackageComparisonTable() {
  return (
    <TooltipProvider delayDuration={200}>
      <section className="py-4">
        <div className="text-center mb-10">
          <h2 className="mb-3">Детальне порівняння планів</h2>
          <p className="text-body-base color-content-secondary max-w-2xl mx-auto">
            Оберіть план, що відповідає вашим потребам — порівняйте всі включені послуги
          </p>
        </div>

        {/* Desktop Table — lg and above */}
        <div className="hidden lg:block rounded-2xl border border-(--color-border-primary) overflow-hidden shadow-elegant">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-fill-secondary hover:bg-fill-secondary border-b border-(--color-border-primary)">
                  <TableHead className="w-[38%] text-ui-label color-content-secondary py-5 pl-6 pr-4">
                    Послуга
                  </TableHead>
                  {plans.map((plan) => (
                    <TableHead
                      key={plan.key}
                      className="text-center py-5 w-[15.5%]"
                    >
                      <h5>{plan.label}</h5>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceGroups.map((group) => (
                  <Fragment key={group.title}>
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={5}
                        className="py-3 pl-6"
                      >
                        <h5>{group.title}</h5>
                      </TableCell>
                    </TableRow>
                    {group.rows.map((row) => (
                      <TableRow
                        key={row.name}
                        className="border-b border-(--color-border-primary)"
                      >
                        <TableCell className="pl-6 pr-4 py-4">
                          <ServiceNameCell
                            name={row.name}
                            tooltip={row.tooltip}
                          />
                        </TableCell>
                        {plans.map((plan) => (
                          <TableCell
                            key={plan.key}
                            className={cn(
                              "text-center py-4",
                              plan.popular && "bg-amber-50/40"
                            )}
                          >
                            <CellContent value={row[plan.key]} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile Tabs — below lg */}
        <div className="lg:hidden">
          <Tabs defaultValue="consultation">
            <TabsList className="w-full grid grid-cols-4 h-auto gap-1 bg-fill-secondary p-1 rounded-xl mb-4">
              {plans.map((plan) => (
                <TabsTrigger
                  key={plan.key}
                  value={plan.key}
                  className="text-xs py-2.5 rounded-lg whitespace-nowrap data-[state=active]:bg-fill-primary data-[state=active]:shadow-elegant data-[state=active]:color-content-primary"
                >
                  {plan.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {plans.map((plan) => (
              <TabsContent key={plan.key} value={plan.key}>
                <div className="rounded-2xl border border-(--color-border-primary) overflow-hidden shadow-elegant">
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <div className="px-4 pt-4 pb-2 border-b border-(--color-border-primary)">
                        <h5>{group.title}</h5>
                      </div>
                      {group.rows.map((row) => (
                        <div
                          key={row.name}
                          className="flex items-center justify-between px-4 py-3.5 border-b border-(--color-border-primary) last:border-b-0"
                        >
                          <div className="flex items-center gap-1.5 flex-1 pr-3 min-w-0">
                            <span className="text-body-small color-content-secondary leading-snug">
                              {row.name}
                            </span>
                            {row.tooltip && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className="color-content-tertiary shrink-0"
                                    aria-label="Детальніше"
                                  >
                                    <Icon name="info" size="md" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  {row.tooltip}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <div className="shrink-0 flex justify-end min-w-[72px]">
                            <CellContent value={row[plan.key]} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </TooltipProvider>
  );
}
