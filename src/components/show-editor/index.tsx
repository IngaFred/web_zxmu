import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
// 导入工具栏配置类型IToolbarConfig，菜单配置类型IEditorConfig
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
// DomEditor.getToolbar(editor) 获取 toolbar 实例
import { DomEditor } from '@wangeditor/editor';
import styles from './index.module.scss';

function ShowEditor(props: any) {
	const content = props.content;
	console.log('content :>> ', content);
	// editor 实例
	const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
	// 编辑器初始内容
	const [html, setHtml] = useState(content.length >0 ? content : '无文本图片作答');

	// 工具栏配置
	const toolbarConfig: Partial<IToolbarConfig> = {
		/* 工具栏配置 */
		/* 显示哪些菜单，如何排序、分组 */
		toolbarKeys: [],
		/* 隐藏哪些菜单 */
		// excludeKeys: [
		// ],
	};
	// 当前菜单排序和分组
	const toolbar = editor ? DomEditor.getToolbar(editor) : null;
	const curToolbarConfig = toolbar?.getConfig();
	// 输出出现有的工具栏列表key值
	// console.log(curToolbarConfig?.toolbarKeys ?? 'noEditor');

	// 初始化编辑器配置
	// 初始化 MENU_CONF 属性
	// 类型是IEditorConfig类型的部分子集，也就是说它可以省略一些IEditorConfig类型的属性
	const editorConfig: Partial<IEditorConfig> = {
		// 编辑器配置，如 placeholder onChange ...
		// 所有的菜单配置，都要在 MENU_CONF 属性下
		MENU_CONF: {},
	};
	editorConfig.readOnly = true;
	editorConfig.placeholder = '请输入内容...';

	// 编辑器创建完毕时的回调函数
	editorConfig.onCreated = (editor: IDomEditor) => {};

	// 及时销毁 editor ，重要！
	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);

	return (
		<>
			<div style={{ border: '1px solid #ccc', zIndex: 100, fontFamily: 'fantasy', fontSize: '16px' }}>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="default"
					style={{ borderBottom: '1px solid #ccc' }}
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={(editor) => setHtml(editor.getHtml())}
					mode="default"
					style={{ height: '400px', overflowY: 'hidden' }}
				/>
			</div>
			{/* <div
				style={{ marginTop: '15px' }}
				className={styles['editor-content-view']}
			>
				{html}
			</div> */}
		</>
	);
}

export default ShowEditor;
