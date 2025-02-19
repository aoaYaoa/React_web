// 删除 DeepSeek 类型声明
- declare module '@deepseek/react' {
-   export const DeepSeekChat: React.ComponentType<{
-     apiKey: string;
-     style?: React.CSSProperties;
-   }>;
- } 