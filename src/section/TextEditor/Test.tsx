import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'

// import { Button, Icon, Toolbar } from './ComponentEditor'

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code, LooksTwo, LooksOne,
  FormatQuote, FormatListNumberedRounded,
  FormatListNumberedRtlRounded,
  FormatListBulletedRounded
} from "@mui/icons-material";
import {
  ListItemButton,
  ToggleButton, Card,
  Container,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichTextExample = ({cancel}:{cancel:any}) => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Container>
      {/* <Box p={4} m={4} border={1} borderColor="grey.500" borderRadius={4}> */}
      <Typography component='h3' sx={{ mb: 5 }}>
         Update <Button onClick={cancel}>Kembali</Button>
       </Typography>
      <Card>
      
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Toolbar>
              <MarkButton format="bold">
                <FormatBold />
              </MarkButton>
              <MarkButton format="italic">
                <FormatItalic />
              </MarkButton>
              <MarkButton format="underline">
                <FormatUnderlined />
              </MarkButton>
              <MarkButton format="code">
                <Code />
              </MarkButton>
              <BlockButton format="heading-one">
                <LooksOne />
              </BlockButton>
              <BlockButton format="heading-two">
                <LooksTwo />
              </BlockButton>
              <BlockButton format="block-quote">
                <FormatQuote />
              </BlockButton>
              <BlockButton format="numbered-list">
                <FormatListNumberedRounded />
              </BlockButton>
              <BlockButton format="bulleted-list">
                <FormatListBulletedRounded />
              </BlockButton>
            </Toolbar>
          
          {/* <Box pl={5}> */}
          <CardContent sx={{ background: "blanchedalmond", color:'black' }}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Enter some rich text…"
              spellCheck={false}
              autoFocus
              onKeyDown={event => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                  }
                }
              }}
            />
             </CardContent>
          {/* </Box> */}
        </Slate>
        {/* </Box> */}
        
      </Card>
    </Container>
  )
}

const Toolbar: any = React.forwardRef(({ className, ...props }: { className: any }, ref) => (
  <Menu {...props} ref={ref} />
));

const Menu = React.forwardRef(({ children, ...props }, ref) => (
  <>
    <Box
      display='flex'
      // display="flex"
      // direction="row"
      // justify="flex-start"
      alignItems="center"
      flexWrap="wrap"
    >
      {children}
    </Box>
    <Box pt={2}>
      <Divider variant="middle" />
    </Box>
  </>
));


const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: any, format: any) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )

  return !!match
}

const isMarkActive = (editor: any, format: any) => {
  const marks: any = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: { attributes: any, children: any, element: any }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      // console.log('hello');
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: { attributes: any, children: any, leaf: any }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, children }: { format: any, children: any }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const MarkButton = ({ format, children }: { format: any, children: any }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default RichTextExample