import {
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
} from "next-intl";

export type TranslationKey<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never,
> = MessageKeys<
  NestedValueOf<
    {
      "!": IntlMessages;
    },
    [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
  >,
  NestedKeyOf<
    NestedValueOf<
      {
        "!": IntlMessages;
      },
      [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
    >
  >
>;
