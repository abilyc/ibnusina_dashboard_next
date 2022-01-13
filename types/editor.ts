interface ParagraphElement {
    type: 'paragraph';
    children: CustomText[];
}

interface CodeElement {
    type: 'code';
    children: CustomText[];
}

export type ImageElement = {
    type: 'image'
    url: string
    children: EmptyText[]
}

export type EmptyText = {
    text: string
}
interface FormattedText {
    text: string;
    bold?: true;
}

export type CustomElement = ParagraphElement | CodeElement | ImageElement
export type CustomText = FormattedText
