import {
    ReactEditor,
    useSlateStatic,
    useSelected,
    useFocused,
} from 'slate-react'
import { css } from '@emotion/css'
import { Button, Icon } from './component';
import { Transforms } from 'slate'

export const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

export const DefaultElement = (props: any) => {
    return (
        <p {...props.attributes}>
            {props.children}
        </p>
    )
}

// Define a React component to render leaves with bold text.
export const Leaf = (props: any) => {
    // console.log(props.leaf.bold);
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}

export const Image = ({ attributes, children, element }: { attributes: any, children: any, element: any }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
                className={css`
            position: relative;
          `}
            >
                <img
                    src={element.url}
                    className={css`
              display: block;
              max-width: 100%;
              max-height: 20em;
              box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
            `}
                />
                <Button
                    active
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                    className={css`
              display: ${selected && focused ? 'inline' : 'none'};
              position: absolute;
              top: 0.5em;
              left: 0.5em;
              background-color: white;
            `}
                >
                    <Icon>delete</Icon>
                </Button>
            </div>
        </div>
    )
}