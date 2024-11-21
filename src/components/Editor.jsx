import {useRef, useEffect} from "react";
import {JsonEditor as Editor} from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import ace from "brace";

// eslint-disable-next-line react/prop-types
export default function JsonEditor({value = {}, onChange}) {
    const jsonEditorRef = useRef(null);

    useEffect(() => {
        if (jsonEditorRef.current !== null) {
            jsonEditorRef.current.set(value);
        }
    }, [value]);

    const setRef = instance => {
        if (instance) {
            jsonEditorRef.current = instance.jsonEditor;
        } else {
            jsonEditorRef.current = null;
        }
    };

    return <div className="editor">
        <Editor
            ref={setRef}
            value={value}
            history
            onChange={onChange}
            mode="tree"
            ace={ace}
            theme="ace/theme/github"
        />
    </div>;
}