import { Editor, Transforms, Text } from 'slate';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { ImageElement } from 'types/editor-types';

const CustomEditor = {
    isBoldMarkActive(editor: BaseEditor & ReactEditor) {
        const [match] = Editor.nodes(editor, {
            match: (n: any) => n.bold === true,
            universal: true,
        })

        return !!match
    },

    isCodeBlockActive(editor: BaseEditor & ReactEditor) {
        const [match] = Editor.nodes(editor, {
            match: (n: any) => n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor: BaseEditor & ReactEditor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? undefined : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    // toggleCodeBlock(editor: BaseEditor & ReactEditor) {
    //     const isActive = CustomEditor.isCodeBlockActive(editor)
    //     Transforms.setNodes(
    //         editor,
    //         { type: isActive ? undefined : 'code' },
    //         { match: n => Editor.isBlock(editor, n) }
    //     )
    // },
    insertImage (editor: any, url: any) {
        const text = { text: '' }
        const image: ImageElement = { type: 'image', url, children: [text] }
        Transforms.insertNodes(editor, image)
    }
}

export default CustomEditor;