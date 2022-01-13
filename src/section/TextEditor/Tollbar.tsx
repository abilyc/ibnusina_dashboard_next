// Import React dependencies.
import React, { useCallback, useMemo, useState } from 'react'
import { BaseEditor} from 'slate'
import { ReactEditor } from 'slate-react'
import CustomEditor from './CustomEditor';

// function Toolbar({ children }:{children:any}) {
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }

function Toolbar(editor: any) {
    return (
        <div>
            <button
                onMouseDown={event => {
                    console.log('hellloo')
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                }}
            >
                Bold
            </button>
            <button
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleCodeBlock(editor)
                }}
            >
                Code
            </button>
        </div>
    )
}

export default Toolbar