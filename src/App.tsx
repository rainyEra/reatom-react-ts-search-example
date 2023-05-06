import { action, atom } from '@reatom/framework'
import { useAction, useAtom } from '@reatom/npm-react'
import './App.css'

const inputAtom = atom('', 'inputAtom')
const greetingAtom = atom((ctx) => {
  const input = ctx.spy(inputAtom)
  return input ? `Hello, ${input}!` : ''
}, 'greetingAtom')
const onInput = action((ctx, event: React.ChangeEvent<HTMLInputElement>) =>
  inputAtom(ctx, event.currentTarget.value),
  'onInput'
)

export default function App() {
  const [input] = useAtom(inputAtom)
  const [greeting] = useAtom(greetingAtom)
  const handleInput = useAction(onInput)

  return (
    <main>
      <p>
        <input
          value={input}
          onChange={handleInput}
          placeholder="Your name"
        />
      </p>
      <p>{greeting}</p>
    </main>
  )
}