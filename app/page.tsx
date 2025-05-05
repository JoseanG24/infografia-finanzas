"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  BarChart3,
  LineChart,
  PieChart,
  Calculator,
  BarChart,
  TrendingUp,
  Factory,
  ArrowUpRight,
  Database,
  BookOpen,
} from "lucide-react"
import { PageTransition } from "@/components/transitions"
import { IconAnimation } from "@/components/icon-animation"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function FinancesDashboard() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Asegurarse de que el componente está montado antes de usar mediaQuery
  useEffect(() => {
    setMounted(true)
  }, [])

  // Definir los temas con sus relaciones y tamaños
  const topics = [
    {
      id: "perdidas-ganancias",
      title: "Análisis de Estado Pérdidas y Ganancias",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "from-purple-600 to-indigo-600",
      size: "large",
      group: "financial-statements",
      relatedTo: ["balance-general", "costo-ventas"],
    },
    {
      id: "balance-general",
      title: "Análisis Balance General",
      icon: <LineChart className="h-6 w-6" />,
      color: "from-blue-600 to-cyan-600",
      size: "medium",
      group: "financial-statements",
      relatedTo: ["perdidas-ganancias", "razones-liquidez"],
    },
    {
      id: "razones-liquidez",
      title: "Razones de Liquidez",
      icon: <PieChart className="h-6 w-6" />,
      color: "from-emerald-600 to-teal-600",
      size: "medium",
      group: "ratios",
      relatedTo: ["balance-general", "razones-endeudamiento"],
    },
    {
      id: "rotacion",
      title: "Rotación",
      icon: <Calculator className="h-6 w-6" />,
      color: "from-orange-600 to-amber-600",
      size: "small",
      group: "ratios",
      relatedTo: ["razones-liquidez"],
    },
    {
      id: "razones-endeudamiento",
      title: "Razones de Endeudamiento",
      icon: <BarChart className="h-6 w-6" />,
      color: "from-red-600 to-rose-600",
      size: "medium",
      group: "ratios",
      relatedTo: ["apalancamiento"],
    },
    {
      id: "costo-ventas",
      title: "Costo de Ventas",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-amber-600 to-yellow-600",
      size: "large",
      group: "costs",
      relatedTo: ["perdidas-ganancias", "costos-indirectos"],
    },
    {
      id: "analisis-dupont",
      title: "Análisis DuPont",
      icon: <PieChart className="h-6 w-6" />,
      color: "from-pink-600 to-rose-600",
      size: "large",
      group: "analysis",
      relatedTo: ["apalancamiento", "razones-endeudamiento"],
    },
    {
      id: "costos-indirectos",
      title: "Costos Indirectos",
      icon: <Factory className="h-6 w-6" />,
      color: "from-violet-600 to-purple-600",
      size: "small",
      group: "costs",
      relatedTo: ["costo-ventas"],
    },
    {
      id: "apalancamiento",
      title: "Apalancamiento",
      icon: <ArrowUpRight className="h-6 w-6" />,
      color: "from-sky-600 to-blue-600",
      size: "medium",
      group: "analysis",
      relatedTo: ["analisis-dupont", "razones-endeudamiento"],
    },
    {
      id: "erp",
      title: "ERP",
      icon: <Database className="h-6 w-6" />,
      color: "from-lime-600 to-green-600",
      size: "large",
      group: "systems",
      relatedTo: [],
    },
  ]

  // Agrupar temas por categoría
  const groupedTopics = {
    "financial-statements": {
      title: "Estados Financieros",
      topics: topics.filter((t) => t.group === "financial-statements"),
    },
    ratios: {
      title: "Razones Financieras",
      topics: topics.filter((t) => t.group === "ratios"),
    },
    costs: {
      title: "Análisis de Costos",
      topics: topics.filter((t) => t.group === "costs"),
    },
    analysis: {
      title: "Análisis Avanzado",
      topics: topics.filter((t) => t.group === "analysis"),
    },
    systems: {
      title: "Sistemas",
      topics: topics.filter((t) => t.group === "systems"),
    },
  }

  // Determinar el tamaño de la tarjeta basado en la propiedad size
  const getCardSize = (size: string, isMobile: boolean) => {
    if (isMobile) {
      return "h-60 w-full" // En móvil todas las tarjetas tienen el mismo tamaño
    }

    switch (size) {
      case "large":
        return "h-72 md:col-span-2 md:row-span-2"
      case "medium":
        return "h-64 md:col-span-1 md:row-span-2"
      case "small":
        return "h-56 md:col-span-1 md:row-span-1"
      default:
        return "h-64 md:col-span-1 md:row-span-1"
    }
  }

  if (!mounted) {
    return null // Evitar renderizado en servidor para prevenir errores de hidratación
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Fondo con efecto de partículas */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Gradiente de fondo */}
        <div className="absolute inset-0 z-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto mb-8 max-w-4xl px-4 pt-12 text-center md:mb-16 md:pt-20"
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-purple-900/50 p-3 backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-purple-300" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Introducción a las Finanzas
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Explora los conceptos fundamentales a través de esta guía interactiva
          </p>
        </motion.div>

        {/* Contenido principal - Diseño de mapa mental */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20">
          {/* Versión móvil - Agrupada por categorías */}
          {isMobile && (
            <div className="space-y-12">
              {Object.entries(groupedTopics).map(([groupId, group]) => (
                <motion.div
                  key={groupId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white">{group.title}</h2>
                  <div className="space-y-4">
                    {group.topics.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} isMobile={isMobile} getCardSize={getCardSize} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Versión desktop - Diseño de mapa mental */}
          {!isMobile && (
            <div className="relative">
              {/* Líneas de conexión entre tarjetas relacionadas */}
              <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                {topics.map((topic) =>
                  topic.relatedTo.map((relatedId, idx) => {
                    const relatedTopic = topics.find((t) => t.id === relatedId)
                    if (!relatedTopic) return null

                    // Extraer colores para el gradiente
                    const fromColor = topic.color.split(" ")[0].replace("from-", "")
                    const toColor = relatedTopic.color.split(" ")[0].replace("from-", "")

                    return (
                      <motion.line
                        key={`${topic.id}-${relatedId}-${idx}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.3 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        x1={`${(topics.indexOf(topic) % 3) * 33 + 16.5}%`}
                        y1={`${Math.floor(topics.indexOf(topic) / 3) * 280 + 140}px`}
                        x2={`${(topics.indexOf(relatedTopic) % 3) * 33 + 16.5}%`}
                        y2={`${Math.floor(topics.indexOf(relatedTopic) / 3) * 280 + 140}px`}
                        stroke={`url(#gradient-${topic.id}-${relatedId})`}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    )
                  }),
                )}

                {/* Definir gradientes para las líneas */}
                <defs>
                  {topics.map((topic) =>
                    topic.relatedTo.map((relatedId) => {
                      const relatedTopic = topics.find((t) => t.id === relatedId)
                      if (!relatedTopic) return null

                      // Extraer colores para el gradiente
                      const fromColor = topic.color.split(" ")[0].replace("from-", "")
                      const toColor = relatedTopic.color.split(" ")[0].replace("from-", "")

                      return (
                        <linearGradient
                          key={`gradient-${topic.id}-${relatedId}`}
                          id={`gradient-${topic.id}-${relatedId}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor={`rgb(var(--${fromColor}))`} />
                          <stop offset="100%" stopColor={`rgb(var(--${toColor}))`} />
                        </linearGradient>
                      )
                    }),
                  )}
                </defs>
              </svg>

              {/* Grid de tarjetas con diseño de mosaico */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-4 md:gap-x-6 md:gap-y-4">
                {topics.map((topic, index) => (
                  <TopicCard key={topic.id} topic={topic} isMobile={isMobile} getCardSize={getCardSize} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decoración de fondo */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-64 bg-gradient-to-t from-black to-transparent" />
      </div>
    </PageTransition>
  )
}

// Componente de tarjeta de tema
function TopicCard({
  topic,
  isMobile,
  getCardSize,
}: {
  topic: any
  isMobile: boolean
  getCardSize: (size: string, isMobile: boolean) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      className={`${getCardSize(topic.size, isMobile)} transform transition-all duration-300 hover:scale-105 hover:z-10`}
    >
      <Link href={`/temas/${topic.id}`} className="block h-full">
        <div
          className={`group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br ${topic.color} p-1 shadow-lg transition-all duration-300 hover:shadow-xl`}
        >
          <div className="relative flex h-full flex-col justify-between rounded-xl bg-gray-900/90 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:bg-gray-900/70">
            <div className="mb-3 flex justify-center">
              <div className={`rounded-full bg-gradient-to-br ${topic.color} p-3`}>
                <IconAnimation color={topic.color}>{topic.icon}</IconAnimation>
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="mb-2 text-center text-xl font-bold text-white">{topic.title}</h2>
              <div className="mt-2 flex justify-center">
                <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${topic.color} opacity-70`}></div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <motion.div
                className="flex items-center justify-center rounded-full bg-white/10 p-2 transition-all duration-300 group-hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
