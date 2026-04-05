import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icon } from '@/components/ui/icons'
import type { GuideFAQ as GuideFAQType } from '@/api/guides'

interface GuideFAQProps {
  faqs: GuideFAQType[] | null | undefined
}

export function GuideFAQ({ faqs }: GuideFAQProps) {
  if (!faqs?.length) return null

  return (
    <section className="mt-12" aria-label="Часті запитання">
      <h3 className="mb-4">Часті запитання</h3>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <div key={faq.id} className="group">
            <AccordionItem
              value={`faq-${index}`}
              className="peer border-b-0 rounded-lg px-4 transition-colors duration-300 data-[state=open]:bg-fill-secondary"
            >
              <AccordionTrigger
                className="hover:no-underline cursor-pointer gap-6 text-left text-base font-medium leading-normal"
                icon={
                  <Icon
                    name="angleDown"
                    size="lg"
                    className="shrink-0 transition-transform duration-300 ease-in-out in-data-[state=open]:rotate-180"
                  />
                }
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {faq.answer_html ? (
                  <div
                    className="text-body-base color-content-secondary [&>p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: faq.answer_html }}
                  />
                ) : null}
              </AccordionContent>
            </AccordionItem>
            <hr className="mx-4 -mb-px group-last:hidden border-(--color-border-primary) transition-opacity duration-300 peer-data-[state=open]:opacity-0" />
          </div>
        ))}
      </Accordion>
    </section>
  )
}
