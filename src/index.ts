/**
 * 将 HTML 字符串解析为 DOM 节点和属性对象
 * 
 * @description 根据传入的 HTML 字符串，将其转换为 HTML 节点，并返回节点和属性
 * @param {string} html - 要解析的 HTML 字符串
 * @returns {Object} 包含解析结果的对象
 * @returns {Element} returns.node - 解析后的 DOM 元素节点
 * @returns {Record<string, string>} returns.attrs - 元素的所有属性键值对
 */
export const jsonToHtmlAttr = (html: string): {
  node: Element;
  attrs: Record<string, string>;
} => {
  const parser = new DOMParser();

  // 将 HTML 字符串解析为 DOM 文档对象,例如：'<card msg="hello"/>' 会被解析为 DOM 结构
  const doc = parser.parseFromString(html, "text/html");

  // 获取解析后的第一个元素（即 card 元素）
  // doc.body.firstElementChild 就是 <card> 标签对应的 DOM 元素
  const currentNode = doc.body.firstElementChild as Element;

  // 提取 card 元素的所有属性
  const attrs: Record<string, string> = {};
  for (let i = 0; i < currentNode.attributes.length; i++) {
    const attr = currentNode.attributes[i];
    // 将每个属性名和属性值存储到 attrs 对象中,例如：msg="hello" 会被存储为 { msg: "hello" }
    attrs[attr.name] = attr.value;
  }

  return {
    node: currentNode,
    attrs,
  };
};

/**
 * 将对象转换为 HTML 标签属性字符串
 * 
 * @description 将键值对对象转换为 HTML 标签属性字符串形式，用于动态生成 HTML 属性
 * @param {Record<string, string>} attrs - 要转换的属性对象
 * @returns {string} HTML 属性字符串，如果对象为空或无效则返回空字符串
 */
export const htmlAttrToJson = (attrs: Record<string, string>) => {
  if (!attrs || typeof attrs !== "object") {
    return "";
  }
  const parts = Object.entries(attrs)
    .filter(([key, value]) => value != null && key.trim())
    .map(([key, value]) => {
      const cleanKey = key.trim();
      const cleanValue = String(value).trim();
      return `${cleanKey}="${cleanValue}"`;
    });

  return parts.length > 0 ? " " + parts.join(" ") : "";
};
