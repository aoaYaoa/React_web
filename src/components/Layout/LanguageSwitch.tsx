import { Select } from 'antd';
import { useLocale } from '@/hooks/useLocale';
import { SUPPORTED_LOCALES } from '@/locales';

export function LanguageSwitch() {
  const { locale, changeLocale, messages } = useLocale();

  const localeOptions = SUPPORTED_LOCALES.map(({ value, label }) => ({
    value,
    label: messages.languages[value] || label // 使用翻译后的语言名称
  }));

  return (
    <Select
      value={locale}
      onChange={changeLocale}
      options={localeOptions}
      bordered={false}
      dropdownMatchSelectWidth={false}
    />
  );
} 