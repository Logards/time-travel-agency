import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, AlertCircle } from 'lucide-react'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 2 500€, 7 jours
- Crétacé -65M (dinosaures, nature préhistorique, T-Rex, ptérosaures) — à partir de 4 800€, 5 jours
- Florence 1504 (Renaissance, art, Michel-Ange, Léonard de Vinci, Médicis) — à partir de 3 200€, 6 jours

Tu peux suggérer des destinations selon les intérêts du client.
Tu réponds uniquement en français, en 2-4 phrases maximum sauf si l'utilisateur demande plus de détails.
Commence toujours de manière accueillante et enthousiaste.`

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: 'Bonjour et bienvenue chez TimeTravel Agency ! 🕰️ Je suis votre conseiller en voyages temporels. Vers quelle époque rêvez-vous de voyager ? Paris 1889, le Crétacé ou Florence 1504 ?',
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="typing-dot w-2 h-2 rounded-full bg-gold" />
      <div className="typing-dot w-2 h-2 rounded-full bg-gold" />
      <div className="typing-dot w-2 h-2 rounded-full bg-gold" />
    </div>
  )
}

function Message({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          isUser ? 'bg-white/10' : 'bg-gold/20 border border-gold/30'
        }`}
      >
        {isUser
          ? <User className="w-3.5 h-3.5 text-white/60" />
          : <Bot className="w-3.5 h-3.5 text-gold" />
        }
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-gold text-space-dark font-medium rounded-tr-sm'
            : 'glass border border-white/8 text-white/80 rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY
  const hasApiKey = apiKey && apiKey !== 'your_mistral_api_key_here'

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMsg = { id: Date.now(), role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    setError(null)

    if (!hasApiKey) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: "⚠️ Aucune clé API configurée. Veuillez ajouter votre clé VITE_MISTRAL_API_KEY dans le fichier .env pour activer le chatbot IA.",
          },
        ])
        setIsLoading(false)
      }, 800)
      return
    }

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }))

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
            { role: 'user', content: trimmed },
          ],
          max_tokens: 400,
          temperature: 0.75,
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.message || `Erreur API ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content ?? "Je n'ai pas pu générer de réponse."

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content },
      ])
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col"
            style={{ height: 480 }}
          >
            <div className="flex flex-col h-full glass-dark border border-gold/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8 bg-space-deep/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">Chrono</p>
                    <p className="text-white/40 text-xs mt-0.5">Assistant temporel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/40 hover:text-white transition-colors p-1"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                  <Message key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="glass border border-white/8 rounded-2xl rounded-tl-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex items-start gap-2 text-red-400 text-xs p-3 bg-red-950/30 border border-red-900/40 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/8">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez-moi vos questions sur les voyages temporels..."
                    rows={1}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-gold/40 transition-colors max-h-20 leading-relaxed"
                    style={{ scrollbarWidth: 'none' }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-gold hover:bg-gold-light disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:scale-105 disabled:scale-100"
                    aria-label="Envoyer"
                  >
                    <Send className="w-4 h-4 text-space-dark disabled:text-white/30" />
                  </button>
                </div>
                <p className="text-white/20 text-[10px] text-center mt-2">
                  Propulsé par Mistral AI · Entrée pour envoyer
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-gold hover:bg-gold-light shadow-lg shadow-gold/30 flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-gold"
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-space-dark" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-space-dark" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
