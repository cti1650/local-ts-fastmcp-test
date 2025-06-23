# Local TypeScript FastMCP Test

## このリポジトリについて

ローカル環境でMCPサーバーをTypeScriptのFastMCPで構築する検証のためのリポジトリ

## 初期設定

### Claude Desktop

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`  
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json:claude_desktop_config.json
{
  "mcpServers": {
    "local-ts-fastmcp-test": {
      "command": "npx",
      "args": ["github:cti1650/local-ts-fastmcp-test"]
    }
  }
}
```

### 詰まっているポイント
- VercelにAdapterが存在しないようなので、デプロイできない

## 参考サイト
- [GitHub punkpeye/fastmcp](https://github.com/punkpeye/fastmcp)
- [簡易な自作MCPサーバーをお試しで実装する方法](https://zenn.dev/smartround_dev/articles/02af1058e9f80f)