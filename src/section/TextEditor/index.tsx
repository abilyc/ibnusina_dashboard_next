// Import React dependencies.
import React, { useCallback, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { BaseEditor, Descendant } from 'slate'
import {
    ReactEditor,
    // useSlateStatic,
    Slate, Editable, withReact
} from 'slate-react'
import { withHistory } from 'slate-history'
import { CustomElement, CustomText, ImageElement } from 'types/editor-types';
import CustomEditor from './CustomEditor';
import { CodeElement, DefaultElement, Leaf, Image } from './ElementEditor';
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'


declare module 'slate' {
    interface CustomTypes {
        // Editor: BaseEditor & ReactEditor & HistoryEditor
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

function TextEditor() {
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        []
    )
    const [value, setValue] = useState<Descendant[] | any>(
        [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            },
        ]
    );
    const handleKey = (e: any) => {
        console.log(e);
    }

    // -------------------------------------------------

    const renderElement: any = useCallback((props: any) => {
        const { attributes, children, element } = props
        switch (element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'image':
                return <Image {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <div>
                <button onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                }}
                >
                    Bold
                </button>
                {/* <button onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleCodeBlock(editor)
                }}
                >
                    Code
                </button> */}
                <button onMouseDown={(event: any) => {
                    event.preventDefault()
                    const url = window.prompt('Enter the URL of the image:')
                    if (url && !isImageUrl(url)) {
                        alert('URL is not an image')
                        return
                    }
                    CustomEditor.insertImage(editor, url)
                }}
                >
                    Image
                </button>
            </div>
            <Editable
                spellCheck={false}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event: any) => {

                    if (!event.ctrlKey) {
                        return
                    }

                    switch (event.key) {
                        // When "`" is pressed, keep our existing code block logic.
                        // case '`': {
                        //     event.preventDefault()
                        //     CustomEditor.toggleCodeBlock(editor)
                        //     break
                        // }

                        // When "B" is pressed, bold the text in the selection.
                        case 'b': {
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                            break
                        }
                    }

                }}
            />
        </Slate>
    );
}

const withImages = (editor: any) => {
    const { insertData, isVoid } = editor

    editor.isVoid = (element: any) => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = (data: any) => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        CustomEditor.insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            CustomEditor.insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const isImageUrl = (url: any) => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext: any = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

export default TextEditor;