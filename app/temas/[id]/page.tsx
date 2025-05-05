"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Home,
  ChevronRight,
  AlertTriangle,
  TrendingDown,
  Package,
  LineChartIcon as ChartLineDown,
  Clock,
  CreditCard,
  Shield,
  DollarSign,
  Factory,
  BarChart,
  Clipboard,
  Calculator,
  CheckCircle,
  XCircle,
  PieChart,
  TrendingUp,
  BarChart2,
  Layers,
  Link2,
  Building2,
  History,
  Target,
  Network,
  Workflow,
  Globe,
  Users,
  ShoppingCart,
  Truck,
  LayoutDashboard,
  Clock3,
  Table,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/transitions"

// Datos de los temas
const temasData = {
  "perdidas-ganancias": {
    title: "Análisis de Estado Pérdidas y Ganancias",
    description: "Evaluación de ingresos, costos y utilidades de una empresa en un período específico.",
    color: "from-purple-600 to-indigo-600",
    mainImage: "/placeholder.svg?key=2t382",
    keyPoints: [
      {
        title: "Estado de Resultados",
        content:
          "El estado de resultados muestra la evolución de los ingresos, costos y utilidades a lo largo de diferentes períodos.",
        tableImage: "/estado-resultados.png",
        icon: <Table className="h-8 w-8 text-purple-400" />,
      },
      {
        title: "Cálculo del Costo de Ventas (año n-2)",
        content:
          "El cálculo del costo de ventas es fundamental para determinar la rentabilidad de una empresa. A continuación se muestra cómo calcularlo correctamente.",
        formula: "Costo de venta = Inventario inicial + Costo de producción - Inventario final",
        calculations: [
          {
            title: "Fórmula del costo de venta",
            formula:
              "[costo de venta n-2] = [+ inventario inicial de producto terminado n-3] + [costo de producción] - [Inventario final de producto terminado del año n-2]",
          },
          {
            title: "Fórmula del costo de producción",
            formula:
              "[costo de producción] = [costo de venta n-2] - [inventario inicial de producto terminado n-3] + [inventario final de producto terminado del año n-2]",
          },
          {
            title: "Cálculo exacto",
            formula: "Costo de producción (n-2) = 70.40 - 0 (no hay n-3) + 3.30 = 73.7",
          },
        ],
        explanation:
          "La razón de restar el inventario final de producto terminado del año n-2 (para el costo de ventas) es porque si no se restan, estamos asumiendo que todos los productos fabricados durante el año fueron vendidos, lo cual no es cierto. El inventario final representa aquellos productos que siguen en existencia y no deben incluirse en el costo de lo vendido.",
        icon: <Calculator className="h-8 w-8 text-purple-400" />,
      },
      {
        title: "Análisis de Crecimiento y Rentabilidad",
        content:
          "Se observa un crecimiento en ventas con margen de utilidad bajo, lo que indica problemas en la estructura de costos de la empresa.",
        issues: [
          "En el estado de resultados (%) se ve claramente que las ventas han crecido, pero el margen de utilidad neta se mantiene bajo (de 4.9% pasó a 3.6%)",
          "Esto quiere decir que aunque la empresa vende más, sus costos han aumentado en mayor proporción, lo que está afectando su rentabilidad de manera negativa",
        ],
        causes: [
          "Posible crecimiento en costos de producción y ventas",
          "Aumento en gastos financieros (23% → 26% de las ventas)",
          "Utilidad operativa en disminución (33.0% → 28.8%)",
        ],
        icon: <TrendingDown className="h-8 w-8 text-rose-400" />,
      },
      {
        title: "Problemas con la Gestión de Inventarios",
        content:
          "El inventario final de productos terminados ha aumentado significativamente, indicando problemas en la gestión.",
        issues: [
          "El inventario final de productos terminados ha aumentado, lo que indica que la empresa está produciendo más de lo que vende",
          "Esto puede significar baja demanda o problemas de comercialización",
          "La acumulación de inventario representa capital inmovilizado y costos adicionales de almacenamiento",
        ],
        icon: <Package className="h-8 w-8 text-orange-400" />,
      },
    ],
  },
  "balance-general": {
    title: "Análisis Balance General",
    description: "Evaluación de la situación financiera mostrando activos, pasivos y patrimonio.",
    color: "from-blue-600 to-cyan-600",
    mainImage: "/placeholder.svg?key=31oxs",
    keyPoints: [
      {
        title: "Balance General",
        content:
          "El balance general muestra la situación financiera de la empresa en diferentes períodos, detallando activos, pasivos y patrimonio.",
        tableImage: "/balance-general-tabla.png",
        icon: <Table className="h-8 w-8 text-blue-400" />,
      },
      {
        title: "Liquidez en Riesgo",
        content: "Deterioro en la capacidad de pago a corto plazo",
        issues: [
          "Aumento de cuentas por pagar y acumulación de inventario",
          "Crecimiento en cuentas por cobrar (clientes tardan más en pagar)",
        ],
        icon: <AlertTriangle className="h-8 w-8 text-yellow-400" />,
      },
      {
        title: "Alto Endeudamiento",
        content: "Dependencia creciente de financiamiento externo",
        issues: ["Crecimiento significativo del pasivo total", "Aumento de gastos financieros confirma mayor deuda"],
        icon: <TrendingDown className="h-8 w-8 text-red-400" />,
      },
      {
        title: "Exceso de Inventario",
        content: "Acumulación preocupante de productos sin vender",
        issues: [
          "Inventario de productos terminados aumentó de 3.3 → 10.8",
          "Se produce más de lo que se vende, confirmando problemas de ventas",
        ],
        icon: <Package className="h-8 w-8 text-orange-400" />,
      },
    ],
  },
  "razones-liquidez": {
    title: "Razones de Liquidez",
    description: "Indicadores de la capacidad para cumplir obligaciones a corto plazo.",
    color: "from-emerald-600 to-teal-600",
    mainImage: "/placeholder.svg?key=xnk84",
    keyPoints: [
      {
        title: "Razón Corriente",
        content: "Mide la capacidad de la empresa para cubrir sus deudas a corto plazo con sus activos corrientes",
        values: [
          { period: "Año n-2", value: "2.20", note: "buena liquidez" },
          { period: "Año n-1", value: "1.94", note: "baja levemente, pero sigue siendo buena" },
          { period: "Septiembre año n", value: "1.66", note: "una gran disminución" },
          { period: "Diciembre año n", value: "1.62", note: "sigue bajando" },
        ],
        conclusion: "La empresa está perdiendo su liquidez con el tiempo",
        formula: "Razón corriente = Activos corrientes / Pasivos corrientes",
        icon: <ChartLineDown className="h-8 w-8 text-emerald-400" />,
      },
      {
        title: "Razón Ácida Tradicional",
        content: "Evalúa si la empresa puede pagar sus deudas sin depender de vender inventarios",
        values: [
          { period: "Año n-2", value: "1.23", note: "suficiente liquidez" },
          { period: "Año n-1", value: "1.15", note: "ligera disminución pero aún es estable" },
          { period: "Septiembre año n", value: "0.86", note: "ya no puede cubrir deudas sin vender inventarios" },
          {
            period: "Diciembre año n",
            value: "0.67",
            note: "se agrava la situación y la empresa depende completamente de vender activos",
          },
        ],
        conclusion:
          "La empresa ha perdido liquidez a tal punto que ya no puede pagar sus deudas solo con sus activos más líquidos (efectivo e inversiones)",
        formula: "Prueba ácida = (Activos corrientes - Inventarios) / Pasivos corrientes",
        icon: <AlertTriangle className="h-8 w-8 text-yellow-400" />,
      },
      {
        title: "Razón Ácida Cuentas por Cobrar",
        content:
          "Similar a la tradicional pero incluye las cuentas por cobrar de los clientes (el dinero que aún no ha sido cobrado)",
        values: [
          { period: "Año n-2", value: "1.65", note: "" },
          { period: "Año n-1", value: "1.55", note: "" },
          { period: "Septiembre año n", value: "1.24", note: "" },
          { period: "Diciembre año n", value: "0.99", note: "" },
        ],
        conclusion:
          "En el año n y n1 la razón cae a 0.99, lo que significa que ni siquiera considerando las cuentas por cobrar puede pagar sus deudas a corto plazo. Esto también sugiere que los clientes se están tardando más en pagar lo cual afecta a la liquidez de la empresa.",
        formula: "Prueba ácida CxC = (Activos corrientes - Inventarios - Cuentas por cobrar) / Pasivos corrientes",
        icon: <TrendingDown className="h-8 w-8 text-red-400" />,
      },
    ],
    conclusion: {
      title: "¿Qué está pasando con la empresa?",
      points: [
        "Deterioro progresivo de la liquidez",
        "Dependencia de cuentas por cobrar e inventarios",
        "Posible sobreproducción de ventas",
        "Endeudamiento creciente",
      ],
    },
  },
  rotacion: {
    title: "Rotación",
    description: "Análisis de la eficiencia en la gestión de inventarios y cuentas por cobrar.",
    color: "from-orange-600 to-amber-600",
    mainImage: "/placeholder.svg?key=j41bl",
    keyPoints: [
      {
        title: "Rotación de Inventario de Productos Terminados",
        content: "Mide cuántos días en promedio tarda la empresa en vender su inventario de productos terminados.",
        terms: [
          "Inventario inicial: Productos terminados que ya estaban en la empresa al inicio del período",
          "Inventario final: Productos terminados que quedaron sin vender al final del período",
          "Costo de ventas: Representa el costo de los productos efectivamente vendidos durante el período",
        ],
        analysis:
          "La cantidad de días para vender el inventario ha aumentado cada año, o sea que los productos están tardando más en venderse. En menos de 3 meses la rotación aumentó 3 días, lo que quiere decir que hay menor demanda, problemas de la gestión de inventarios y sobreproducción.",
        formula: "((Inventario Inicial + Inventario Final)/2)/(Costos de ventas)*365",
        icon: <Clock className="h-8 w-8 text-orange-400" />,
      },
      {
        title: "Rotación de Cuentas por Cobrar",
        content:
          "Muestra cuántos días en promedio tarda la empresa en cobrar el dinero de sus ventas a crédito. Un periodo largo indica que los clientes están tardando más en pagar.",
        terms: [
          "Cuentas por cobrar: Dinero que los clientes aún no han pagado por compras a crédito",
          "Ventas a crédito: Representa el porcentaje de las ventas totales que se hicieron al crédito",
        ],
        analysis:
          "El tiempo de cobro de clientes aumentó desde 45 días en el año n-2, hasta casi 61 días en septiembre del año n, lo que significa que la empresa esta tardando más en recibir el dinero de sus ventas. Esto puede afectar el flujo de caja ya que mucha parte del capital se queda en cuentas que se tienen que cobrar aún y no está a la mano para saldar las deudas necesarias al finalizar el mes. Sin embargo en el cierre del año n, el período bajo de 60.95 a 49.21 lo cual quiere decir que hay una mejora en las políticas de crédito y en la gestión de los cobros, aunque sigue siendo alto el tiempo de cobro de deudas.",
        formula: "(Cuentas por cobrar*365)/(Ventas*35%)",
        icon: <CreditCard className="h-8 w-8 text-amber-400" />,
      },
    ],
    formulasImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RRiTCxC16gPyLLWAzvBi1orDule4Pw.png",
  },
  "razones-endeudamiento": {
    title: "Razones de Endeudamiento",
    description: "Medición del financiamiento con deuda vs. capital propio.",
    color: "from-red-600 to-rose-600",
    mainImage: "/placeholder.svg?key=wgxtl",
    keyPoints: [
      {
        title: "Grado de Autonomía",
        content:
          "Este índice muestra qué porcentaje de los activos de la empresa está financiado con capital propio (capital social y patrimonio) en lugar de deudas.",
        values: [
          { period: "Año n-2", value: ">50%", note: "Más del 50% de los activos están financiados con capital propio" },
          { period: "Año n-1", value: "44.71%", note: "El endeudamiento comenzó a aumentar" },
          {
            period: "Año n y n'",
            value: "36.52%",
            note: "Casi dos tercios de los activos están financiados con deuda",
          },
        ],
        conclusion:
          "El grado de autonomía ha disminuido progresivamente, lo que indica que la empresa está dependiendo más del financiamiento externo y menos de su propio capital.",
        formula: "(capital social y patrimonio) * 100 / (activos + efectivo + inventarios)",
        icon: <Shield className="h-8 w-8 text-red-400" />,
      },
      {
        title: "Cobertura de Intereses",
        content:
          "Este índice muestra si la empresa genera suficientes utilidades para pagar los intereses de sus deudas. Un valor alto indica que la empresa puede cubrir cómodamente sus gastos financieros.",
        values: [
          {
            period: "Año n-2",
            value: "19.63%",
            note: "La empresa generaba utilidades netas aceptables en relación con sus intereses",
          },
          { period: "Año n-1", value: "16.67%", note: "Sugiere una creciente presión financiera" },
          { period: "Año n", value: "17.66%", note: "Ligera mejora pero sigue siendo preocupante" },
          {
            period: "Diciembre año n",
            value: "15.49%",
            note: "Indicador preocupante, mayor parte de utilidades se destina a pagar intereses",
          },
        ],
        conclusion:
          "Una mayor proporción de los recursos se destina al pago de intereses, reduciendo su capacidad de reinversión y limitando su crecimiento.",
        formula: "utilidades netas * 100 / gastos financieros",
        icon: <DollarSign className="h-8 w-8 text-rose-400" />,
      },
    ],
    formulasImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-21S67XnPUOrr5mCb36hNLtB9YmNoIn.png",
    conclusion: {
      title: "Situación de Endeudamiento",
      points: [
        "La empresa está aumentando su nivel de endeudamiento y perdiendo autonomía financiera",
        "Depende cada vez más de financiamiento externo en lugar de capital propio",
        "Una mayor proporción de sus recursos se destina al pago de intereses",
        "Reducción de capacidad de reinversión y limitación de crecimiento",
        "Si no toma medidas correctivas, podría llegar a un punto crítico donde su financiamiento se vuelva insostenible",
      ],
    },
  },
  "costos-indirectos": {
    title: "Costos Indirectos de Fabricación",
    description: "Costos no directamente relacionados con la producción pero necesarios.",
    color: "from-violet-600 to-purple-600",
    mainImage: "/placeholder.svg?key=7w05n",
    keyPoints: [
      {
        title: "Estimación de Ventas",
        content:
          "Proyección de unidades a vender por trimestre de cada producto. Sirve como base para planear la producción, los inventarios y los costos asociados.",
        values: [
          { product: "Producto A", units: "40,000" },
          { product: "Producto B", units: "20,500" },
        ],
        icon: <BarChart className="h-8 w-8 text-violet-400" />,
      },
      {
        title: "Producción Requerida",
        content: "Determina cuántas unidades hay que fabricar tomando en cuenta inventarios y ventas proyectadas.",
        terms: [
          "Ventas presupuestadas: cantidad que se espera vender",
          "Inventario final deseado (a dic 32 del año n): unidades que se quieren tener disponibles al final del periodo",
          "Inventario inicial disponible: unidades disponibles al inicio",
        ],
        values: [
          { product: "Producto A", units: "41,700" },
          { product: "Producto B", units: "21,320" },
          { product: "Total unidades a producir", units: "63,020" },
        ],
        icon: <Factory className="h-8 w-8 text-purple-400" />,
      },
      {
        title: "Análisis de Costos",
        content: "Evaluación de la estructura de costos de producción y su impacto en la rentabilidad.",
        analysis: [
          {
            title: "Producción planeada con base a ventas + inventarios",
            content:
              "Se ajustó la producción no solo a lo que se espera vender, sino también a lo que se necesita tener en inventario para no quedar sin producto. Este es un enfoque preventivo y eficiente.",
          },
          {
            title: "Carga significativa de costos indirectos",
            content:
              "Los costos indirectos (Q66.5M) representan más del 30% del costo total de producción, lo cual es bastante alto. De estos, la mano de obra indirecta y el mantenimiento son los más costosos. Lo cual podría indicar uso intensivo de maquinaria o instalaciones grandes y alto nivel de supervisión o gastos operativos fijos.",
          },
          {
            title: "Materia prima es el mayor componente del costo",
            content:
              "Representa más del 50% del costo total. Esto suele pasar en empresas manufactureras. Controlar el precio de materia prima o buscar eficiencias aquí podría tener un gran impacto en los costos totales.",
          },
        ],
        icon: <Clipboard className="h-8 w-8 text-fuchsia-400" />,
      },
    ],
    mainImage: "/placeholder.svg?key=03kkl",
  },
  "costo-ventas": {
    title: "Costo de Ventas",
    description: "Análisis del costo de los productos vendidos y su impacto en la rentabilidad.",
    color: "from-amber-600 to-yellow-600",
    mainImage: "/placeholder.svg?key=9d7kl",
    keyPoints: [
      {
        title: "Componentes del Costo de Producción",
        content: "El costo de producción se compone de materia prima, mano de obra directa y costos indirectos.",
        values: [{ item: "Costo de producción total", value: "Q212,274,889.00" }],
        formula: "Costo de producción = materia prima + mano de obra directa + costos indirectos",
        icon: <Factory className="h-8 w-8 text-amber-400" />,
      },
      {
        title: "Inventario Inicial de Producto Terminado",
        content:
          "El valor de los productos que ya estaban fabricados y disponibles al inicio del periodo. Se suma porque aunque se haya producido menos, si ya hay productos listos del año anterior, esos también estarán disponibles para vender.",
        values: [
          { item: "Producto A", value: "Q5,025,000.00", note: "2,500 unidades × Q2,010" },
          { item: "Producto B", value: "Q5,776,650.00", note: "1,350 unidades × Q4,279" },
          { item: "Total", value: "Q10,801,650.00", note: "" },
        ],
        icon: <Package className="h-8 w-8 text-yellow-400" />,
      },
      {
        title: "Inventario Final de Producto Terminado",
        content:
          "Es el valor de los productos que se fabricaron este año pero que NO se van a vender y se guardarán como inventario. Se resta porque se produjeron, pero no se van a vender aún, entonces no deben considerarse como costo de ventas del año.",
        values: [
          { item: "Producto A", value: "Q10,424,400.00", note: "4,200 unidades × Q2,482" },
          { item: "Producto B", value: "Q11,420,710.00", note: "2,170 unidades × Q5,263" },
          { item: "Total", value: "Q21,845,110.00", note: "" },
        ],
        icon: <Package className="h-8 w-8 text-orange-400" />,
      },
      {
        title: "Cálculo del Costo de Ventas",
        content:
          "El costo de ventas representa el costo de los productos que efectivamente se vendieron durante el periodo.",
        calculations: [
          {
            title: "Costo total de productos terminados",
            formula: "Costo de producción + Inventario inicial",
            calculation: "Q212,274,889.00 + Q10,801,650.00 = Q223,076,539.00",
          },
          {
            title: "Costo de ventas presupuestado",
            formula: "Costo total productos terminados - Inventario final",
            calculation: "Q223,076,539.00 - Q21,845,110.00 = Q201,231,429.00",
          },
        ],
        icon: <BarChart className="h-8 w-8 text-amber-400" />,
      },
      {
        title: "Costo Unitario",
        content: "Se calcula el costo por unidad para cada producto, que se usa tanto en ventas como inventarios.",
        values: [
          { item: "Producto A", value: "Q2,482.00", note: "Antes: Q2,010.00" },
          { item: "Producto B", value: "Q5,263.00", note: "Antes: Q4,279.00" },
        ],
        formula: "Costo unitario = costo total del producto / unidades producidas",
        analysis:
          "Esto indica un incremento en costos de producción, probablemente por aumento en precios de materias primas o mano de obra, o mayores costos indirectos.",
        icon: <Calculator className="h-8 w-8 text-yellow-400" />,
      },
    ],
    conclusion: {
      title: "Conclusiones del Costo de Ventas",
      points: [
        "Se proyecta vender productos por un costo total de Q201.2 millones, considerando lo que ya había producido antes y lo nuevo.",
        "El aumento en el costo unitario de ambos productos sugiere que la eficiencia o los costos de fabricación se vieron afectados.",
        "El inventario final representa más de Q21 millones en productos no vendidos, lo cual es estratégico si se quiere evitar desabastecimiento, pero puede ser riesgoso si no se logra vender en el futuro.",
        "El inventario inicial ayudó a cubrir parte de las ventas sin necesidad de producción nueva, optimizando los recursos.",
      ],
    },
  },
  "analisis-dupont": {
    title: "Análisis DuPont",
    description: "Evaluación de la rentabilidad sobre el patrimonio (ROE) y sus componentes.",
    color: "from-pink-600 to-rose-600",
    mainImage: "/placeholder.svg?key=d7p9k",
    keyPoints: [
      {
        title: "Consolidado vs No Consolidado",
        content: "Comparación de dos formas de presentar los estados financieros y su impacto en el análisis DuPont.",
        icon: <PieChart className="h-8 w-8 text-pink-400" />,
      },
      {
        title: "Análisis Consolidado",
        content: "Visión completa que incluye todos los activos, pasivos y patrimonios del grupo empresarial.",
        values: [
          { item: "Patrimonio", value: "Q66,820,243" },
          { item: "Apalancamiento", value: "2.03", formula: "135,570,000/66,820,243 = 2.03" },
          { item: "ROE", value: "41%", formula: "20% x 2.03 = 41%" },
        ],
        characteristics: [
          "Incluye todos los activos, pasivos y patrimonios del grupo empresarial (empresa matriz + subsidiarias)",
          "Muestra la realidad financiera global del grupo",
          "Es más conservador y preciso",
        ],
        icon: <CheckCircle className="h-8 w-8 text-emerald-400" />,
      },
      {
        title: "Análisis No Consolidado",
        content: "Visión parcial que solo incluye la empresa principal, sin las subsidiarias.",
        values: [
          { item: "Patrimonio", value: "Q19,600,000" },
          { item: "Apalancamiento", value: "4.48", formula: "87,820,000/19,600,000 = 4.48" },
          { item: "ROE", value: "91%", formula: "20% * 4.48 = 91%" },
        ],
        characteristics: [
          "Solo incluye la empresa principal, sin las subsidiarias",
          "En el ROE, solo se considera el capital propio (acciones comunes), ignorando otros aportes o reservas",
          "Puede exagerar la rentabilidad si hay alto apalancamiento",
        ],
        icon: <XCircle className="h-8 w-8 text-red-400" />,
      },
    ],
    formulasImage1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rl9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd.png",
    formulasImage2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rl9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd.png",
    conclusion: {
      title: "Conclusiones del Análisis DuPont",
      points: [
        "El modelo DuPont permite entender no solo cuánto gana la empresa, sino cómo lo gana: si es por buena operación, uso eficiente de activos, o por alto apalancamiento.",
        "Al comparar el análisis consolidado vs no consolidado, vemos que el ROE de 91% es producto de un alto apalancamiento (4.48), mientras que el análisis consolidado muestra un ROE más realista de 41%, con un apalancamiento financiero moderado de 2.03.",
        "ROE Consolidado (41%): Por cada Q1 invertido por los accionistas, la empresa genera Q0.41 de ganancia. Es una rentabilidad sólida y realista.",
        "ROE No Consolidado (91%): Parece que gana Q0.91 por cada quetzal invertido, pero es engañoso porque solo considera una parte del capital (acciones comunes), y muestra una rentabilidad inflada.",
        "El análisis consolidado da una visión más confiable y estable. El no consolidado puede hacer que la empresa parezca más rentable de lo que realmente es, porque oculta parte del riesgo financiero al no mostrar toda la deuda ni el capital total.",
      ],
    },
  },
  apalancamiento: {
    title: "Apalancamiento",
    description: "Uso de deuda para aumentar la rentabilidad e impacto en resultados.",
    color: "from-sky-600 to-blue-600",
    mainImage: "/placeholder.svg?key=nfzqk",
    keyPoints: [
      {
        title: "Definición General",
        content:
          "El apalancamiento es el uso del pasivo para incrementar la productividad de la inversión de la empresa.",
        icon: <Layers className="h-8 w-8 text-sky-400" />,
      },
      {
        title: "Apalancamiento Operativo",
        content: "Es la relación entre los ingresos por ventas de la empresa y las utilidades operativas.",
        description: [
          "Nos permite ver el rendimiento de los costos de operación en función del ingreso de ventas",
          "Analiza el apalancamiento de los costos de operación",
        ],
        formulas: [
          {
            name: "Fórmula base",
            formula: "Apalancamiento operativo = Costos fijos operativos",
          },
          {
            name: "En la hoja",
            formula: "68.5 (gastos operativos) + 201.2 (costo de ventas) = 269.7",
          },
        ],
        icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      },
      {
        title: "Apalancamiento Financiero",
        content:
          "Es la relación entre las utilidades antes de intereses y la utilidad neta (o ganancias para accionistas comunes).",
        description: [
          "Nos permite ver el rendimiento de los costos financieros en función de la utilidad operativa",
          "Se analiza la influencia del uso de deudas como obligaciones bancarias en las ganancias por acción (GPA)",
        ],
        formulas: [
          {
            name: "Fórmula base",
            formula: "Apalancamiento financiero = Costos fijos financieros",
          },
          {
            name: "En la hoja",
            formula: "201.2 + 68.5 + 17.6 = 287.3",
          },
        ],
        icon: <DollarSign className="h-8 w-8 text-sky-400" />,
      },
      {
        title: "Apalancamiento Total",
        content:
          "Es el efecto combinado de los dos apalancamientos, relación entre los ingresos por ventas de la empresa y su utilidad neta.",
        formula: "Apalancamiento total = Apalancamiento operativo × Apalancamiento financiero",
        icon: <BarChart2 className="h-8 w-8 text-indigo-400" />,
      },
      {
        title: "Relación con el Análisis DuPont",
        content: "Conexión entre el apalancamiento y el modelo DuPont de análisis financiero.",
        points: [
          "El DuPont usa directamente el apalancamiento financiero.",
          "El apalancamiento operativo no está explícitamente en DuPont, pero afecta el margen neto, que sí forma parte del modelo.",
          "El apalancamiento total se refleja indirectamente en el ROE, porque muestra la sensibilidad de la utilidad neta (numerador del ROE) ante las ventas.",
        ],
        icon: <Link2 className="h-8 w-8 text-blue-400" />,
      },
    ],
  },
  erp: {
    title: "ERP",
    description: "Sistemas que integran y automatizan procesos de negocio.",
    color: "from-lime-600 to-green-600",
    mainImage: "/placeholder.svg?key=frt3r",
    keyPoints: [
      {
        title: "Conceptos Básicos",
        content: "Fundamentos esenciales para entender los sistemas ERP.",
        points: [
          {
            title: "Empresa",
            description:
              "Una empresa es una entidad organizada que realiza actividades comerciales o industriales para generar valor o maximizar las ganancias de sus propietarios.",
          },
          {
            title: "Organización",
            description:
              "Es el uso de sistemas que permiten establecer orden en las operaciones de la empresa. Un ERP mejora esta organización.",
          },
          {
            title: "Organigrama",
            description:
              "Es una representación visual de la estructura jerárquica, que muestra cómo están distribuidas las funciones y responsabilidades.",
          },
        ],
        icon: <Building2 className="h-8 w-8 text-lime-400" />,
      },
      {
        title: "Evolución de la Administración",
        content: "Cambios en los enfoques administrativos a lo largo del tiempo.",
        points: [
          {
            title: "Administración Tradicional",
            description:
              "Estructura jerárquica y rígida. Enfocada en el control vertical, decisiones centralizadas y medición de resultados.",
          },
          {
            title: "Administración Contemporánea",
            description:
              "Flexible y horizontal. Promueve el uso de sistemas de información (como ERP) para agilizar procesos y tomar decisiones con base en datos.",
          },
        ],
        icon: <History className="h-8 w-8 text-green-400" />,
      },
      {
        title: "Estrategia y Costos",
        content: "Relación entre la planificación estratégica y la gestión de costos.",
        points: [
          {
            title: "Planeación Estratégica",
            description:
              "Es el proceso por el cual una empresa define su misión, visión y objetivos. Estudia la situación actual y plantea estrategias para alcanzarlos.",
          },
          {
            title: "Costos y Contabilidad Financiera",
            description:
              "Relaciona los costos con la contabilidad financiera, determinando el costo de ventas y la rentabilidad.",
          },
          {
            title: "Costos y su Aplicación Administrativa",
            description:
              "Analiza cómo los costos pueden ser usados para optimizar recursos, mejorar procesos y hacer a la empresa más eficiente.",
          },
          {
            title: "Costos y Análisis Financiero",
            description:
              "Evalúa el impacto de los costos en la rentabilidad, márgenes de ganancia y salud financiera de la empresa, usando herramientas de análisis financiero.",
          },
        ],
        icon: <Target className="h-8 w-8 text-lime-400" />,
      },
      {
        title: "ERP y su Función",
        content: "Definición y propósito de los sistemas ERP en las organizaciones.",
        description:
          "Es un conjunto de aplicaciones integradas que permiten gestionar las áreas clave de una empresa como: Inventario, Proveedores, Clientes, Producción y Finanzas. Su objetivo es centralizar la información, reducir errores, automatizar tareas y mejorar la toma de decisiones.",
        icon: <Network className="h-8 w-8 text-green-400" />,
      },
      {
        title: "Módulos Principales del ERP",
        content: "Componentes fundamentales que conforman un sistema ERP.",
        modules: [
          {
            name: "Customer Web Portal",
            description:
              "Plataforma en línea donde los clientes pueden ver pedidos, facturas, pagar, actualizar datos o solicitar soporte.",
            icon: <Globe className="h-6 w-6 text-green-400" />,
          },
          {
            name: "CRM & Ventas",
            description:
              "Gestiona clientes, oportunidades y procesos de ventas. Ayuda a cerrar negocios más rápido y a mejorar la relación con el cliente.",
            icon: <Users className="h-6 w-6 text-lime-400" />,
          },
          {
            name: "Purchasing (Compras)",
            description:
              "Administra el proceso completo de compras: solicitud, recepción, facturación, órdenes de compra y control de proveedores.",
            icon: <ShoppingCart className="h-6 w-6 text-green-400" />,
          },
          {
            name: "Manufacturing (Producción)",
            description:
              "Gestiona desde la planificación y programación de la producción hasta el control de inventarios y órdenes de trabajo.",
            icon: <Factory className="h-6 w-6 text-lime-400" />,
          },
          {
            name: "Distribution (Distribución)",
            description:
              "Administra la logística, inventarios, rutas y entregas, asegurando que los productos lleguen a tiempo y en buen estado.",
            icon: <Truck className="h-6 w-6 text-green-400" />,
          },
          {
            name: "Finance (Finanzas)",
            description:
              "Controla cuentas por pagar, presupuestos, nómina y reportes. Asegura el cumplimiento normativo y facilita decisiones financieras.",
            icon: <DollarSign className="h-6 w-6 text-lime-400" />,
          },
          {
            name: "Dashboards",
            description:
              "Muestra información clave en tiempo real con gráficos y paneles personalizados. Ayuda a tomar decisiones rápidas y con datos confiables.",
            icon: <LayoutDashboard className="h-6 w-6 text-green-400" />,
          },
          {
            name: "Time and Projects",
            description:
              "Administra proyectos, tiempos y tareas, controlando recursos, plazos y costos para garantizar eficiencia.",
            icon: <Clock3 className="h-6 w-6 text-lime-400" />,
          },
        ],
        icon: <Workflow className="h-8 w-8 text-lime-400" />,
      },
    ],
    conclusion: {
      title: "Conclusión General",
      points: [
        "Un ERP es una herramienta esencial que transforma digitalmente la gestión empresarial, permitiendo:",
        "Control total de los procesos",
        "Mejora en eficiencia y comunicación",
        "Reducción de errores y duplicidad de datos",
        "Toma de decisiones más acertada",
      ],
    },
  },
}

export default function TemaPage({ params }: { params: { id: string } }) {
  const [tema, setTema] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos
    setLoading(true)
    setTimeout(() => {
      setTema(temasData[params.id as keyof typeof temasData])
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
      </div>
    )
  }

  if (!tema) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Tema no encontrado</h1>
          <p className="mb-8 text-gray-400">El tema que estás buscando no existe o ha sido movido.</p>
          <Link href="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </PageTransition>
    )
  }

  // Renderizado específico para perdidas-ganancias
  if (params.id === "perdidas-ganancias") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-20">
          {/* Header con navegación */}
          <div className="bg-gray-900 py-4">
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex items-center gap-2 text-white/80">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    <Home className="mr-1 h-4 w-4" />
                    Inicio
                  </Button>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>{tema.title}</span>
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <div className={`bg-gradient-to-r ${tema.color} py-8`}>
            <div className="mx-auto max-w-7xl px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-center text-4xl font-bold text-white md:text-5xl"
              >
                {tema.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 text-center text-xl text-white/80"
              >
                {tema.description}
              </motion.p>
            </div>
          </div>

          {/* Contenido principal - Diseño específico para perdidas-ganancias */}
          <main className="mx-auto max-w-7xl px-4">
            {/* Estado de Resultados - Tabla */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-purple-600/20 p-3">{tema.keyPoints[0].icon}</div>
                <h2 className="text-2xl font-bold text-white">{tema.keyPoints[0].title}</h2>
              </div>

              <p className="mb-6 text-lg text-gray-300">{tema.keyPoints[0].content}</p>

              {/* Tabla de Estado de Resultados */}
              <div className="mb-6 overflow-hidden rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg">
                  <Image
                    src={tema.keyPoints[0].tableImage || "/placeholder.svg"}
                    alt="Estado de Resultados"
                    width={800}
                    height={400}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* Cálculo del Costo de Ventas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-purple-600/20 p-3">{tema.keyPoints[1].icon}</div>
                <h2 className="text-2xl font-bold text-white">{tema.keyPoints[1].title}</h2>
              </div>

              <p className="mb-6 text-lg text-gray-300">{tema.keyPoints[1].content}</p>

              {/* Fórmulas y cálculos */}
              <div className="space-y-6">
                {tema.keyPoints[1].calculations.map((calc: any, i: number) => (
                  <div key={i} className="rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                    <h3 className="mb-3 text-lg font-semibold text-white">{calc.title}</h3>
                    <div className="formula">
                      <code className="text-purple-300">{calc.formula}</code>
                    </div>
                  </div>
                ))}
              </div>

              {/* Explicación sobre el inventario final */}
              <div className="mt-6 rounded-lg bg-gray-800/20 p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">¿Por qué se resta el inventario final?</h3>
                <p className="text-gray-300">{tema.keyPoints[1].explanation}</p>
              </div>
            </motion.div>

            {/* Análisis de Crecimiento y Rentabilidad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-purple-600/20 p-3">{tema.keyPoints[2].icon}</div>
                <h2 className="text-2xl font-bold text-white">{tema.keyPoints[2].title}</h2>
              </div>

              <p className="mb-6 text-lg text-gray-300">{tema.keyPoints[2].content}</p>

              <div className="mb-6 rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold text-white">Hallazgos</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  {tema.keyPoints[2].issues.map((issue: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold text-white">¿Qué puede estar pasando?</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  {tema.keyPoints[2].causes.map((cause: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Problemas con la Gestión de Inventarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-purple-600/20 p-3">{tema.keyPoints[3].icon}</div>
                <h2 className="text-2xl font-bold text-white">{tema.keyPoints[3].title}</h2>
              </div>

              <p className="mb-6 text-lg text-gray-300">{tema.keyPoints[3].content}</p>

              <div className="rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold text-white">Consecuencias</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  {tema.keyPoints[3].issues.map((issue: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Botón de regreso */}
            <div className="mt-12 text-center">
              <Link href="/">
                <Button variant="outline" size="lg" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a todos los temas
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </PageTransition>
    )
  }

  // Renderizado específico para balance-general
  if (params.id === "balance-general") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-20">
          {/* Header con navegación */}
          <div className="bg-gray-900 py-4">
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex items-center gap-2 text-white/80">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    <Home className="mr-1 h-4 w-4" />
                    Inicio
                  </Button>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>{tema.title}</span>
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <div className={`bg-gradient-to-r ${tema.color} py-8`}>
            <div className="mx-auto max-w-7xl px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-center text-4xl font-bold text-white md:text-5xl"
              >
                {tema.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 text-center text-xl text-white/80"
              >
                {tema.description}
              </motion.p>
            </div>
          </div>

          {/* Contenido principal - Diseño específico para balance general */}
          <main className="mx-auto max-w-7xl px-4">
            {/* Balance General - Tabla */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 rounded-full bg-blue-600/20 p-3">{tema.keyPoints[0].icon}</div>
                <h2 className="text-2xl font-bold text-white">{tema.keyPoints[0].title}</h2>
              </div>

              <p className="mb-6 text-lg text-gray-300">{tema.keyPoints[0].content}</p>

              {/* Tabla de Balance General */}
              <div className="mb-6 overflow-hidden rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg">
                  <Image
                    src={tema.keyPoints[0].tableImage || "/placeholder.svg"}
                    alt="Balance General"
                    width={800}
                    height={500}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* Análisis e interpretación - Diseño específico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="mb-8 text-center text-3xl font-bold text-white">Análisis e Interpretación</h2>

              <div className="grid gap-6 md:grid-cols-3">
                {tema.keyPoints.slice(1).map((point: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                    className={`overflow-hidden rounded-xl bg-gradient-to-br ${tema.color} p-1`}
                  >
                    <div className="h-full rounded-lg bg-gray-900/90 p-6">
                      <div className="mb-4 flex items-center">
                        <div className="mr-3 rounded-full bg-gray-800 p-2">{point.icon}</div>
                        <h3 className="text-xl font-bold text-white">{point.title}</h3>
                      </div>

                      <p className="mb-4 text-gray-300">{point.content}</p>

                      <ul className="list-inside list-disc space-y-2 text-gray-300">
                        {point.issues.map((issue: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Botón de regreso */}
            <div className="mt-12 text-center">
              <Link href="/">
                <Button variant="outline" size="lg" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a todos los temas
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </PageTransition>
    )
  }

  // Renderizado específico para razones-liquidez
  if (params.id === "razones-liquidez") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-20">
          {/* Header con navegación */}
          <div className="bg-gray-900 py-4">
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex items-center gap-2 text-white/80">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    <Home className="mr-1 h-4 w-4" />
                    Inicio
                  </Button>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>{tema.title}</span>
              </div>
            </div>
          </div>

          {/* Título y descripción */}
          <div className={`bg-gradient-to-r ${tema.color} py-8`}>
            <div className="mx-auto max-w-7xl px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-center text-4xl font-bold text-white md:text-5xl"
              >
                {tema.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 text-center text-xl text-white/80"
              >
                {tema.description}
              </motion.p>
            </div>
          </div>

          {/* Tabla de Razones de Liquidez */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-full bg-emerald-600/20 p-3">
                <Table className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Tabla de Razones de Liquidez</h2>
            </div>

            <p className="mb-6 text-lg text-gray-300">
              Esta tabla muestra el análisis financiero tradicional de las razones de liquidez de la empresa a través
              del tiempo.
            </p>

            {/* Tabla de Razones de Liquidez */}
            <div className="mb-6 overflow-hidden rounded-lg bg-gray-800/30 p-5 backdrop-blur-sm">
              \
