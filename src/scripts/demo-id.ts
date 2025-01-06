import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface DemoConfig {
  id?: string
  slug?: string
}

const args = process.argv.slice(2)

const parsedArgs: Record<string, string | undefined> = {}

args.forEach((arg) => {
  const [key, value] = arg.split('=')
  if (key.startsWith('--')) {
    parsedArgs[key.slice(2)] = value
  }
})

const demoId: string | undefined = parsedArgs.id
const demoSlug: string | undefined = parsedArgs.slug

if (!demoId && !demoSlug) {
  console.error('Error: You must provide either --id or --slug.')
  process.exit(1)
}

const demoFilePath: string = path.resolve(__dirname, '../stores/demoConfig.json')

const demoConfig: DemoConfig = {
  id: demoId,
  slug: demoSlug
}

try {
  fs.writeFileSync(demoFilePath, JSON.stringify(demoConfig, null, 2), 'utf-8')
  console.log('Demo configuration updated successfully:', demoConfig)
} catch (error) {
  console.error('Error writing to demo-config.json:', error)
  process.exit(1)
}
