import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  contractNumberField,
  dateField,
  integerIdField,
  isValidDateValue,
  moneyField,
} from '../../lib/validation'

export function createContractFormSchema(t: TFunction<'contracts'>) {
  const textMessages = {
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
  }

  return z
    .object({
      institutionId: integerIdField({
        invalidNumber: t('validation.invalidNumber'),
        required: t('validation.institutionRequired'),
      }),
      pricingModeId: integerIdField({
        invalidNumber: t('validation.invalidNumber'),
        required: t('validation.pricingModeRequired'),
      }),
      contractNumber: contractNumberField({
        ...textMessages,
        required: t('validation.contractNumberRequired'),
        invalid: t('validation.contractNumberInvalid'),
      }),
      startDate: dateField({
        required: t('validation.startDateRequired'),
        invalid: t('validation.startDateInvalid'),
      }),
      endDate: dateField({
        required: t('validation.endDateRequired'),
        invalid: t('validation.endDateInvalid'),
      }),
      hourlyVolumePlanned: moneyField({
        invalidNumber: t('validation.hourlyVolumeInvalid'),
        min: t('validation.hourlyVolumePlannedMin'),
      }),
      unitPrice: moneyField({
        invalidNumber: t('validation.unitPriceInvalid'),
        min: t('validation.unitPriceMin'),
      }),
    })
    .refine(
      (values) =>
        !isValidDateValue(values.startDate) ||
        !isValidDateValue(values.endDate) ||
        values.endDate >= values.startDate,
      {
        message: t('validation.endDateAfterStart'),
        path: ['endDate'],
      },
    )
}

export type ContractFormValues = z.infer<
  ReturnType<typeof createContractFormSchema>
>
