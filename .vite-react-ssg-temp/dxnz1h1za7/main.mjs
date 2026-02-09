import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronDown, Menu, Sparkles, MessageSquare, Waypoints, Trophy, GraduationCap, Shield, BrainCog, Landmark, Plane, Backpack, Sun, Mountain, BookOpenCheck, SwatchBook, Users, Heart, Handshake, Check, Circle, ChevronUp, Send, Phone, Mail, Clock, School, Dumbbell, Clapperboard, Waves, FlaskConical, Library, Home, Utensils, Coffee, Store, Sofa, Trees, MapPin, BedDouble, Bath, Presentation, TentTree, Gamepad2, PawPrint, ParkingCircle, Building, Calendar, Compass, ReceiptPoundSterling, CheckCircle, XCircle, Clipboard, FileText, Percent, Luggage, Book, ExternalLink, ArrowLeft, ArrowRight, Target, BookOpen, Award, Globe } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, useLocation, useParams, Navigate, Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SelectPrimitive from "@radix-ui/react-select";
import emailjs from "@emailjs/browser";
import useEmblaCarousel from "embla-carousel-react";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const logo = "/assets/logo-DZioggq0.svg";
const campsByYear = [
  {
    year: 2026,
    camps: [
      { label: "Școala internațională de vară de limbă engleză la Dublin", to: "/scoala-de-vara-dublin-2026" },
      { label: "Tabara in Marea Britanie Grosvenor Hall Activity Centre", to: "/tabara-marea-britanie-grosvenor-hall-2026" },
      { label: "Tabără de limba engleză și aventură în România – Moinești", to: "/tabara-moinesti-2026" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2026" }
    ]
  },
  {
    year: 2025,
    camps: [
      { label: "Școală de vară de limba engleză în Marea Britanie – Manchester", to: "/tabara-marea-britanie-manchester-2025" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2025" },
      { label: "Tabără de limba engleză și aventură în România – Moinești", to: "/tabara-moinesti-2025" }
    ]
  },
  {
    year: 2024,
    camps: [
      { label: "Tabără de limba engleză și aventură în România – Predeal", to: "/tabara-predeal-2024" },
      { label: "Tabără de limba engleză și aventură în România – Poiana Mărului", to: "/tabara-poiana-marului-2024" },
      { label: "Tabără în Marea Britanie – Little Canada Activity Centre", to: "/tabara-marea-britanie-2024" },
      { label: "Școală de vară de limba engleză în Marea Britanie – Winchester", to: "/scoala-de-vara-marea-britanie-2024" }
    ]
  },
  {
    year: 2023,
    camps: [
      { label: "Tabăra de Engleză - Poiana Mărului", to: "/tabara-de-engleza-poiana-marului-2023" },
      { label: "Tabăra de Engleză - Valea Oltului", to: "/tabara-de-engleza-valea-oltului-2023" },
      { label: "Tabăra de Engleză - Marea Britanie", to: "/tabara-de-engleza-marea-britanie-2023" },
      { label: "Școală de vară - Marea Britanie", to: "/scoala-de-vara-marea-britanie-2023" }
    ]
  }
];
const journalItems = [
  { label: "Jurnal Manchester 2025", slug: "manchester-2025" },
  { label: "Jurnal Moinești 2025", slug: "moinesti-2025" },
  { label: "Jurnal Predeal 2024", slug: "predeal-2024" }
];
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({
    tabere2026: false,
    arhiva: false,
    jurnale: false
  });
  const camps2026 = useMemo(() => {
    var _a;
    return ((_a = campsByYear.find((x) => x.year === 2026)) == null ? void 0 : _a.camps) ?? [];
  }, []);
  const archiveByYear = useMemo(() => campsByYear.filter((x) => x.year !== 2026), []);
  useMemo(() => campsByYear.map((x) => x.year), []);
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 w-full bg-secondary/95 backdrop-blur-sm z-50 pb-2 pt-2", children: [
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Pro Erudio Logo", className: "h-16 w-auto" }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "text-secondary-foreground/90 hover:text-secondary-foreground transition-colors font-medium font-large",
            children: "Despre Tabere"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium", children: [
            "Tabere 2026",
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 transition-transform group-hover:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-full left-[-50px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200", children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-lg shadow-lg py-2 min-w-[360px]", children: camps2026.map((camp) => /* @__PURE__ */ jsx(
            Link,
            {
              to: camp.to,
              className: "block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap",
              children: camp.label
            },
            camp.to
          )) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium", children: [
            "Arhivă tabere",
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 transition-transform group-hover:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-full left-[-500px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200", children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-lg shadow-lg p-3 min-w-[820px]", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: archiveByYear.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-3 py-2 font-semibold text-foreground bg-secondary/40", children: item.year }),
            /* @__PURE__ */ jsx("div", { className: "py-1", children: item.camps.map((camp) => /* @__PURE__ */ jsx(
              Link,
              {
                to: camp.to,
                className: "block px-3 py-2 text-foreground hover:bg-accent transition-colors",
                children: camp.label
              },
              camp.to
            )) })
          ] }, item.year)) }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-secondary-foreground/90 hover:text-secondary-foreground font-large transition-colors font-medium", children: [
            /* @__PURE__ */ jsx(Link, { to: "/jurnale", children: "Jurnale Tabără" }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 transition-transform group-hover:rotate-180" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-full left-[-100px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200", children: /* @__PURE__ */ jsx("div", { className: "bg-background border border-border rounded-lg shadow-lg py-2 min-w-[260px]", children: journalItems.map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              to: `/jurnal/${item.slug}`,
              className: "block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap",
              children: item.label
            },
            item.slug
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "lg:hidden text-black",
          onClick: () => setIsOpen(!isOpen),
          "aria-label": "Toggle menu",
          children: isOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      )
    ] }) }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "lg:hidden bg-secondary/95 border-t border-secondary-foreground/20", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-4 space-y-4 overflow-y-auto overscroll-contain",
        style: { maxHeight: "calc(100vh - 80px)" },
        children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "block text-secondary-foreground/90 hover:text-secondary-foreground transition-colors font-medium py-2",
              onClick: () => setIsOpen(false),
              children: "Despre Tabere"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full flex items-center justify-between text-secondary-foreground font-medium py-2",
                onClick: () => setMobileOpen((s) => ({ ...s, tabere2026: !s.tabere2026 })),
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Tabere 2026" }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${mobileOpen.tabere2026 ? "rotate-180" : ""}` })
                ]
              }
            ),
            mobileOpen.tabere2026 && /* @__PURE__ */ jsx("div", { className: "pl-4 space-y-2 pt-2", children: camps2026.map((camp) => /* @__PURE__ */ jsx(
              Link,
              {
                to: camp.to,
                className: "block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors",
                onClick: () => setIsOpen(false),
                children: camp.label
              },
              camp.to
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full flex items-center justify-between text-secondary-foreground font-medium py-2",
                onClick: () => setMobileOpen((s) => ({ ...s, arhiva: !s.arhiva })),
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Arhivă tabere" }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${mobileOpen.arhiva ? "rotate-180" : ""}` })
                ]
              }
            ),
            mobileOpen.arhiva && /* @__PURE__ */ jsx("div", { className: "pl-4 space-y-4 pt-2", children: archiveByYear.map((item) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-secondary-foreground/90 font-semibold mb-2", children: item.year }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: item.camps.map((camp) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: camp.to,
                  className: "block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors",
                  onClick: () => setIsOpen(false),
                  children: camp.label
                },
                camp.to
              )) })
            ] }, item.year)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full flex items-center justify-between text-secondary-foreground font-medium py-2",
                onClick: () => setMobileOpen((s) => ({ ...s, jurnale: !s.jurnale })),
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Jurnale tabără" }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${mobileOpen.jurnale ? "rotate-180" : ""}` })
                ]
              }
            ),
            mobileOpen.jurnale && /* @__PURE__ */ jsx("div", { className: "pl-4 space-y-2 pt-2", children: journalItems.map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: `/jurnal/${item.slug}`,
                className: "block px-4 py-2 text-foreground hover:bg-accent transition-colors whitespace-nowrap",
                children: item.label
              },
              item.slug
            )) })
          ] })
        ]
      }
    ) })
  ] });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const heroImage = "/assets/herohome-Ceu55oDr.jpeg";
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center",
        style: { backgroundImage: `url(${heroImage})` },
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/60" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 relative z-10 text-center py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-primary-foreground text-[1.125rem;]", children: "Tabere de limba engleză pentru copii și adolescenți" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-6xl font-bold text-primary-foreground mb-2", children: "Tabere și școli de vară de limba engleză" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold mb-8", children: /* @__PURE__ */ jsx("span", { className: "bg-accent text-accent-foreground px-4 py-1 rounded-lg inline-block", children: "Pro Erudio" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10", children: "Învață limba engleza prin activități interactive și aventură în natură! Tabere educaționale în România și străinătate, cu activități captivante, profesori dedicați și experiențe de neuitat." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all",
            asChild: true,
            children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  (_a = document.getElementById("registrationForm")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "inline-flex items-center",
                children: [
                  /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 mr-2" }),
                  "Înscrie-te la Tabără"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            variant: "outline",
            className: "bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 font-semibold text-lg px-8 rounded-full",
            asChild: true,
            children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  (_a = document.getElementById("tabere")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "inline-flex items-center",
                children: [
                  /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 mr-2" }),
                  "Descoperă Programele"
                ]
              }
            )
          }
        )
      ] })
    ] })
  ] });
};
const AboutSection = () => {
  const features = [
    {
      icon: Waypoints,
      title: "Programe de vară pentru copii și adolescenți",
      description: "Experiențe în România, Marea Britanie și alte destinații pentru perfecționarea abilităților de exprimare în limba engleză."
    },
    {
      icon: Trophy,
      title: "Peste 2000 de participanți",
      description: "Peste 14 ani de experiență și mii de copii fericiți care revin an de an în taberele noastre din România și străinătate."
    },
    {
      icon: GraduationCap,
      title: "Profesori cu experiență",
      description: "Echipa de profesori dedicați meseriei și pasionați de lucrul cu copiii."
    },
    {
      icon: Shield,
      title: "Siguranța copiilor",
      description: "Supraveghere permanentă, reguli stricte pentru siguranța copiilor, activități de aventură si personal calificat, atenție constantă din partea personala pentru bunăstarea copiilor, program de somn în intervalul orar 23:00-07:00."
    },
    // {
    //   icon: Handshake,
    //   title: "Lucru în echipă",
    //   description: "Obiectivul principal al taberelor din România este îmbunătățirea abilităților de lucru în echipă pentru toți copiii și leadership pentru conducătorii de echipă.",
    // },
    {
      icon: BrainCog,
      title: "Învățare prin Joc",
      description: "Activitățile din tabără sunt interactive și în general bazate pe competiția între echipe, într-o întrecere de tipul Harry Potter, care facilitează dezvoltarea personală într-o atmosferă dinamică, dar relaxată, fară a pune presiune pe participanți."
    },
    {
      icon: Landmark,
      title: "Excursii la obiective turistice",
      description: "Toate programele noastre de vară cuprind o importantă coordonată culturală prin vizite la diferite obiective turistice din zona în care ne aflăm."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "despre", className: "py-10 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-foreground mb-6", children: "Despre Taberele Noastre" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Din 2011 organizăm tabere de limbă engleză care combină educația cu distracția. Copiii își perfecționează limba engleză în mod natural prin conversații reale, activități captivante, lucru în echipă și experiențe culturale autentice." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "text-center group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
};
const CoursesSection = () => {
  const camps = [
    {
      icon: Plane,
      title: "Tabără de limbă engleză si aventură în Marea Britanie",
      subtitle: "Grosvenor Activity Centre",
      description: "Cursuri de limba engleză, activități de aventură in aer liber (rafting, escalada, scrimă, canotaj, tir cu arcul, etc.), vizite culturale și concursuri în echipe multinaționale.",
      color: "bg-primary",
      link: "/tabara-marea-britanie-grosvenor-hall-2026"
    },
    {
      icon: Backpack,
      title: "Școală internațională de vară în Irlanda de Nord",
      subtitle: "Dublin City University",
      description: "Cursuri de limba engleză la renumita universitate din Dublin. Cazare în campus universitar, excursii la obiective turistice locale, activități sportive și seri tematice în grupuri internaționale.",
      color: "bg-emerald-500",
      link: "/scoala-de-vara-dublin-2026"
    },
    {
      icon: Sun,
      title: "Tabără de limba engleză în România",
      subtitle: "Moinești, Județul Bacău",
      description: "Cursuri de limba engleză dimineața, provocări pe echipe la atelierele de după-amiază și seară, mese cu bufet suedez, cazare în complex turistic nou și excursii la obiective turistice din zonă.",
      color: "bg-amber-500",
      link: "/tabara-moinesti-2026"
    },
    {
      icon: Mountain,
      title: "Tabără de limba engleză în România",
      subtitle: "Poiana Mărului, Județul Brașov",
      description: "Tabără în natură, cursuri de limba engleză, drumeții, provocări în echipe și seri tematice. Perfect pentru copiii care iubesc aventura.",
      color: "bg-sky-500",
      link: "/tabara-poiana-marului-2026"
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "tabere", className: "py-10 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Tipuri de Tabere" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Alege tabăra potrivită pentru copilul tău. Fiecare program combină învățarea limbii engleze cu activități culturale, sportive, artistice și de divertisment." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: camps.map((camp, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-xl ${camp.color} flex items-center justify-center mb-6`, children: /* @__PURE__ */ jsx(camp.icon, { className: "w-7 h-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: camp.title }),
          /* @__PURE__ */ jsx("p", { className: "text-primary font-medium mb-3", children: camp.subtitle }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: camp.description }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: camp.link, children: "Vezi Detalii" }) })
        ]
      },
      index
    )) })
  ] }) });
};
const WhyChooseUs = () => {
  const reasons = [
    {
      icon: BookOpenCheck,
      title: "Cursuri de limbă engleză",
      description: "Ținem cont de nivelul de limbă engleză si vârsta copiilor atunci când facem plasarea in grupe. Adaptăm activitățile în funcție de nevoile lor de învățare și interesele vârstei."
    },
    {
      icon: SwatchBook,
      title: "Ateliere de după-amiază",
      description: "Atelierele din timpul după-amiezii se desfășoară în echipe eterogene ca vârstă, având obiectivul de a îmbunătăți abilitățile de comunicare prin participarea la realizarea de proiecte și activități practice."
    },
    {
      icon: Sparkles,
      title: "Activități variate",
      description: "Cursuri de limba engleză, activități sportive, excursii, ateliere creative, provocări pe echipe și seri tematice pentru fiecare zi."
    },
    {
      icon: Users,
      title: "Prieteni noi",
      description: "Socializare cu copii din alte țări sau alți elevi români pentru exersarea limbii engleze în contexte autentice de învățare prin proiecte si activități în echipe. Legarea de noi prietenii este in acest fel garantată."
    },
    {
      icon: Heart,
      title: "Experiențe de neuitat",
      description: "Amintiri pentru o viață și prietenii care durează dincolo de tabără. Fiecare tabără este o aventură unică care îmbină învățarea cu distracția."
    },
    {
      icon: Handshake,
      title: "Lucrul în echipă",
      description: "Obiectivul principal al taberelor din România este îmbunătățirea abilităților de lucru în echipă pentru toți copiii și leadership pentru conducătorii de echipă."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-10 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "De ce taberele Pro Erudio?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Ne diferențiem prin atenția acordată fiecărui copil și formatul original al taberelor, cu obiective educaționale precise." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: reasons.map((reason, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(reason.icon, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-3", children: reason.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: reason.description })
        ]
      },
      index
    )) })
  ] }) });
};
const imagine8motive = "/assets/8-motive-sa-imi-trimit-copilul-in-tabara-DOO2Kk21.jpg";
function ReasonsCampSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-card p-6 md:p-10", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground mb-6", children: "8 motive să-mi trimit copilul într-o tabără" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground leading-relaxed whitespace-pre-line", children: [
          "Când vă gândiţi la dezvoltarea copilului dumneavoastră şi plănuiţi cu atâta grijă educaţia sa şi activităţile extracurriculare ce îl vor ajută să devină un adult de succes şi fericit, nu uitaţi că verile sunt o oportunitate, nu timp pierdut. O  tabăra este un mod  ideal de a experimenta activităţi noi (inclusiv exersarea limbii engleze cu trainer nativ), de a se responsabiliza, dar mai ales de a se distra şi a-şi face prieteni noi.",
          "\n\n",
          "Dacă va întrebaţi care sunt beneficiile participării la tabăra, iată o lista sumară:"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: "bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 transition duration-300 ease-in-out",
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.proerudio.ro/8-motive-sa-mi-trimit-copilul-in-tabara/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center",
                children: "Citește articolul"
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden border border-border", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imagine8motive,
          alt: "Copil în tabără – 8 motive",
          className: "w-full h-[280px] md:h-[360px] object-cover",
          loading: "lazy"
        }
      ) }) })
    ] })
  ] }) }) });
}
const englishTestImage = "/assets/online%20test-jrw4WuDm.avif";
const EnglishTestSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-10 bg-secondary/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: "Test de plasare pentru taberele de limba engleză" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Te-ai înscris la taberele noastre, dar nu urmezi cursuri la Pro Erudio? Nicio problemă! Cu câteva săptămâni înainte de începerea taberei vei primi în email un test online gratuit pentru a te plasa corect în grupele de limba engleză." }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Testul durează aproximativ 15-20 de minute și îți evaluează competențele de vocabular, gramatică și exprimare scrisă în limba engleză. Folosirea oricărei surse de informație (internet, prieteni, cărți) este strict interzisă." }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Mult succes!" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: englishTestImage,
        alt: "Test de amplasament nivel engleză",
        className: "w-full h-[400px] object-cover"
      }
    ) })
  ] }) }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, { ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props }));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const RegistrationForm = ({ variant = "light", defaultCamp = "Școala de vara Dublin 2026" }) => {
  const { toast: toast2 } = useToast();
  const [formData, setFormData] = useState({
    selectedCamp: defaultCamp,
    childName: "",
    childCity: "",
    childBirthDate: "",
    transport: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    source: "",
    gdprConsent: false,
    termsConsent: false
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gdprConsent || !formData.termsConsent) {
      toast2({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile pentru a continua.",
        variant: "destructive"
      });
      return;
    }
    try {
      const serviceId = "service_35lgh7r";
      const templateId = "template_6za1rzl";
      const publicKey = "_MH_YbmRB7EDTrfmD";
      if (!serviceId || !templateId || !publicKey) ;
      const templateParams = {
        selectedCamp: formData.selectedCamp,
        childName: formData.childName,
        childCity: formData.childCity,
        childBirthDate: formData.childBirthDate,
        transport: formData.transport,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        source: formData.source,
        pageUrl: window.location.href
      };
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      toast2({
        title: "Formular trimis cu succes!",
        description: "Am primit solicitarea. Te contactăm în curând."
      });
      setFormData({
        selectedCamp: defaultCamp,
        childName: "",
        childCity: "",
        childBirthDate: "",
        transport: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        source: "",
        gdprConsent: false,
        termsConsent: false
      });
    } catch (err) {
      console.error(err);
      toast2({
        title: "Eroare la trimitere",
        description: "Te rugăm încearcă din nou sau contactează-ne telefonic.",
        variant: "destructive"
      });
    }
  };
  const inputClass = variant === "dark" ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" : "bg-background";
  const labelClass = variant === "dark" ? "text-primary-foreground" : "text-foreground";
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 scroll-mt-60", id: "registrationForm", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "camp", className: `${labelClass} font-medium`, children: "Tabăra selectată" }),
      /* @__PURE__ */ jsxs(Select, { value: formData.selectedCamp, onValueChange: (value) => setFormData({ ...formData, selectedCamp: value }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: inputClass, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Selectează tabăra" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "Școala de vara Dublin 2026", children: "Școala internațională de vară de limbă engleză la Dublin 2026" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Tabara Marea Britanie Grosvenor Hall 2026", children: "Tabara in Marea Britanie Grosvenor Hall Activity Centre 2026" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Tabara Moinești 2026", children: "Tabără de limba engleză și aventură în România – Moinești 2026" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Tabara Poiana Mărului 2026", children: "Tabără de limba engleză și aventură în România – Poiana Mărului 2026" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: `text-lg font-semibold ${labelClass} border-b ${variant === "dark" ? "border-primary-foreground/20" : "border-border"} pb-2`, children: "Date despre cursant" }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "childName", className: labelClass, children: "Numele și prenumele *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "childName",
              placeholder: "Numele complet al copilului",
              value: formData.childName,
              onChange: (e) => setFormData({ ...formData, childName: e.target.value }),
              required: true,
              className: inputClass
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "childCity", className: labelClass, children: "Localitatea de domiciliu *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "childCity",
              placeholder: "Orașul/Comuna",
              value: formData.childCity,
              onChange: (e) => setFormData({ ...formData, childCity: e.target.value }),
              required: true,
              className: inputClass
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "childBirthDate", className: labelClass, children: "Data nașterii *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "childBirthDate",
            type: "date",
            value: formData.childBirthDate,
            onChange: (e) => setFormData({ ...formData, childBirthDate: e.target.value }),
            required: true,
            className: inputClass
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Label, { className: `${labelClass} font-medium`, children: "Optați pentru rezervarea locului la transport prin Pro Erudio?" }),
      /* @__PURE__ */ jsxs(
        RadioGroup,
        {
          value: formData.transport,
          onValueChange: (value) => setFormData({ ...formData, transport: value }),
          className: "flex gap-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "da", id: "transport-da", className: variant === "dark" ? "border-primary-foreground text-primary-foreground" : "" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "transport-da", className: `${labelClass} cursor-pointer`, children: "Da" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "nu", id: "transport-nu", className: variant === "dark" ? "border-primary-foreground text-primary-foreground" : "" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "transport-nu", className: `${labelClass} cursor-pointer`, children: "Nu" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: `text-lg font-semibold ${labelClass} border-b ${variant === "dark" ? "border-primary-foreground/20" : "border-border"} pb-2`, children: "Date despre părinte/tutore" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "parentName", className: labelClass, children: "Numele și prenumele *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "parentName",
            placeholder: "Numele complet al părintelui",
            value: formData.parentName,
            onChange: (e) => setFormData({ ...formData, parentName: e.target.value }),
            required: true,
            className: inputClass
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "parentPhone", className: labelClass, children: "Telefon *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "parentPhone",
              type: "tel",
              placeholder: "07XX XXX XXX",
              value: formData.parentPhone,
              onChange: (e) => setFormData({ ...formData, parentPhone: e.target.value }),
              required: true,
              className: inputClass
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "parentEmail", className: labelClass, children: "Email *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "parentEmail",
              type: "email",
              placeholder: "email@exemplu.ro",
              value: formData.parentEmail,
              onChange: (e) => setFormData({ ...formData, parentEmail: e.target.value }),
              required: true,
              className: inputClass
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "source", className: `${labelClass} font-medium`, children: "Cum ați aflat de taberele noastre?" }),
      /* @__PURE__ */ jsxs(Select, { value: formData.source, onValueChange: (value) => setFormData({ ...formData, source: value }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: inputClass, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Selectează o opțiune" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "facebook", children: "Facebook" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "instagram", children: "Instagram" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "google", children: "Căutare Google" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "recomandare", children: "Recomandare prieten" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "participant-anterior", children: "Am participat anterior" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "altele", children: "Altele" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `space-y-4 pt-4 border-t ${variant === "dark" ? "border-primary-foreground/20" : "border-border"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            id: "gdpr",
            checked: formData.gdprConsent,
            onCheckedChange: (checked) => setFormData({ ...formData, gdprConsent: checked }),
            required: true,
            className: variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""
          }
        ),
        /* @__PURE__ */ jsxs(Label, { htmlFor: "gdpr", className: "text-sm text-muted-foreground leading-relaxed", children: [
          "Am înțeles și sunt de acord cu",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/declaratie-consimtamant",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary font-medium underline",
              children: "declarația de consimțământ"
            }
          ),
          " ",
          "privind procesarea datelor personale *"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            id: "terms",
            checked: formData.termsConsent,
            onCheckedChange: (checked) => setFormData({ ...formData, termsConsent: checked }),
            required: true,
            className: variant === "dark" ? "border-primary-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent" : ""
          }
        ),
        /* @__PURE__ */ jsxs(Label, { htmlFor: "terms", className: "text-sm text-muted-foreground leading-relaxed cursor-pointer", children: [
          "Am citit și sunt de acord cu",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/regulament",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary font-medium underline",
              children: "regulamentul de funcționare"
            }
          ),
          " ",
          "al taberei. *"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "submit",
        size: "lg",
        className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full",
        children: [
          /* @__PURE__ */ jsx(Send, { className: "w-5 h-5 mr-2" }),
          "Trimite Formularul de Înscriere"
        ]
      }
    )
  ] });
};
const CTASection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-primary-foreground mb-6", children: "Rezervă-ți acum locul în tabăra din vara 2026!" }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Card, { className: "bg-card border-0 shadow-2xl", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsx(RegistrationForm, {}) }) }) })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-foreground text-background py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-background mb-1", children: "Telefon" }),
          /* @__PURE__ */ jsx("a", { href: "tel:+40123456789", className: "text-background/70 hover:text-background transition-colors", children: "0724 527 838 (Roxana Popescu)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-background mb-1", children: "Email" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:contact@languageschool.ro", className: "text-background/70 hover:text-background transition-colors", children: "office@proerudio.ro" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-background mb-1", children: "Program" }),
          /* @__PURE__ */ jsxs("p", { className: "text-background/70", children: [
            "Luni - Vineri: 09:00 - 20:00",
            /* @__PURE__ */ jsx("br", {}),
            "Sâmbătă: 09:00 - 14:00"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-background/20 pt-8 text-center text-background/60", children: /* @__PURE__ */ jsx("p", { children: "© 2026 Pro Erudio. Toate drepturile rezervate. Build by Macarie Mihai-Alexandru" }) })
  ] }) });
};
const Index = () => {
  const canonicalUrl = "https://tabere.proerudio.ro";
  const ogImage = heroImage;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Peste 15 ani de experiență în tabere de engleză în România și în străinătate, cu profesori dedicați și activități memorabile."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Peste 15 ani de experiență în tabere de engleză în România, UK și Irlanda. Profesori dedicați, siguranță și experiențe memorabile."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Despre noi – Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Povestea Pro Erudio, echipa și valorile noastre. Tabere de engleză în România și în străinătate."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(AboutSection, {}),
      /* @__PURE__ */ jsx(CoursesSection, {}),
      /* @__PURE__ */ jsx(ReasonsCampSection, {}),
      /* @__PURE__ */ jsx(WhyChooseUs, {}),
      /* @__PURE__ */ jsx(EnglishTestSection, {}),
      /* @__PURE__ */ jsx(CTASection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
  ] }) });
};
const renderItalicText = (text) => {
  const result = [];
  const regex = /\*(.*?)\*/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(
        /* @__PURE__ */ jsx("span", { children: text.slice(lastIndex, match.index) }, lastIndex)
      );
    }
    result.push(
      /* @__PURE__ */ jsx("em", { className: "italic", children: match[1] }, match.index)
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push(
      /* @__PURE__ */ jsx("span", { children: text.slice(lastIndex) }, lastIndex)
    );
  }
  return result;
};
function CampSections({ sections }) {
  if (!(sections == null ? void 0 : sections.length)) return null;
  return /* @__PURE__ */ jsx(Fragment, { children: sections.map((s, idx) => {
    const bg = "";
    if (s.type === "gridBullets") {
      const cols = s.columns ?? 2;
      return /* @__PURE__ */ jsxs("section", { children: [
        s.title ? /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-10 text-center", children: s.title }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            className: [
              "grid gap-6",
              cols === 1 && "grid-cols-1",
              cols === 2 && "grid-cols-1 md:grid-cols-2",
              cols === 3 && "grid-cols-1 md:grid-cols-3"
            ].filter(Boolean).join(" "),
            children: s.cards.map((card, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "rounded-2xl border border-border bg-card shadow-sm p-6",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground mb-4", children: card.subtitle }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: card.items.map((it, j) => /* @__PURE__ */ jsxs("li", { className: "text-muted-foreground leading-relaxed", children: [
                    "• ",
                    renderItalicText(it)
                  ] }, j)) })
                ]
              },
              i
            ))
          }
        )
      ] }, idx);
    }
    return /* @__PURE__ */ jsx("section", { className: `py-6 ${bg}`, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      s.type === "richText" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: s.title }),
        s.paragraphs.map((p, i) => /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-muted-foreground leading-relaxed ${i !== s.paragraphs.length - 1 ? "mb-6" : ""}`,
            children: p
          },
          i
        ))
      ] }),
      s.type === "bullets" && /* @__PURE__ */ jsxs(Fragment, { children: [
        s.title ? /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: s.title }) : null,
        s.subtitle ? /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-foreground mb-2", children: s.subtitle }) : null,
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: s.items.map((it, i) => /* @__PURE__ */ jsxs("li", { className: "text-muted-foreground leading-relaxed", children: [
          "• ",
          it
        ] }, i)) })
      ] }),
      s.type === "twoCols" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: s.title }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: s.left.map((it, i) => /* @__PURE__ */ jsxs("li", { className: "text-muted-foreground leading-relaxed", children: [
            "• ",
            it
          ] }, i)) }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: s.right.map((it, i) => /* @__PURE__ */ jsxs("li", { className: "text-muted-foreground leading-relaxed", children: [
            "• ",
            it
          ] }, i)) })
        ] })
      ] }),
      s.type === "note" && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-accent/10 p-6", children: [
        s.title && /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-2", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: s.text })
      ] }),
      s.type === "image" && /* @__PURE__ */ jsxs(Fragment, { children: [
        s.title && /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-4", children: s.title }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: s.src,
            alt: s.alt,
            className: "w-full rounded-xl border border-border"
          }
        )
      ] })
    ] }) }) }, idx);
  }) });
}
function SectionGallery({
  images,
  className = ""
}) {
  if (!(images == null ? void 0 : images.length)) return null;
  const safeImages = images.slice(0, 4).map(
    (img) => typeof img === "string" ? { src: img } : img
  );
  const count2 = safeImages.length;
  const gridCols = count2 === 1 ? "grid-cols-1" : count2 === 2 ? "grid-cols-2" : count2 === 3 ? "grid-cols-3" : "grid-cols-2";
  const wrapperClass = count2 === 1 ? "max-w-3xl mx-auto" : "max-w-6xl mx-auto";
  return /* @__PURE__ */ jsx("div", { className: `mt-10 ${className}`, children: /* @__PURE__ */ jsx("div", { className: wrapperClass, children: /* @__PURE__ */ jsx("div", { className: `grid ${gridCols} gap-4`, children: safeImages.map((img, idx) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-2xl shadow-lg aspect-[4/3]",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: img.src,
          alt: img.alt ?? `Galerie ${idx + 1}`,
          className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300",
          loading: "lazy"
        }
      )
    },
    idx
  )) }) }) });
}
const heroGrosvenor = "/assets/Grosvenor%20Hall-D3ZKZMRb.jpg";
const activity1 = "/assets/Grosvenor%20Hall%20-%20Activity-C_zEWv6l.gif";
const activity2 = "/assets/Grosvenor%20Hall%20-%20Activity2-CVsjIKXS.jpg";
const activity3 = "/assets/Grosvenor%20Hall%20-%20Activity3-vxG67Lu5.webp";
const activity4 = "/assets/Grosvenor%20Hall%20-%20Activity4-COxRU0WC.png";
const kitTabaraImage = "/assets/Kit%20Tabara%20Pro%20Erudio-CNhuxZ3b.jpg";
const menuImage = "/assets/meniuUK-BGo7Amk2.jpg";
const programUK = "/assets/programUK-AUg6OU2E.jpg";
const programImage = "/assets/Program-65nE-Ajb.jpg";
const heroDublinUniversity = "/assets/Dublin%20City%20University-BCxosWzO.webp";
const aboutDublin = "/assets/Dublin%20About-8dz-I8cj.jpg";
const activityDublin1 = "/assets/Activity1-Dublin-DNWBKRnG.jpg";
const activityDublin2 = "/assets/Activity2-Dublin-Bq9yeFmD.jpg";
const activityDublin3 = "/assets/Activity3-Dublin-Cw4wSWzu.jpg";
const activityDublin4 = "/assets/Activity4-Dublin-BvFKkgst.jpg";
const heroMoinești = "/assets/Moinesti2026-QM_olkfu.jpg";
const heroPoianaMarului = "/assets/PoianaMarului2026-BjJc2p5u.jpg";
const programDublinImage = "/assets/ProgramDublin-DLRSDtmb.png";
const moinestiAbout = "/assets/MoinestiAbout-DJPo97-a.jpg";
const poianaMaruluiAbout = "/assets/PoianaMaruluiAbout-99WBm4TT.jpeg";
const heroManchester2025 = "/assets/scoala-de-vara-manchesterB-jc3IwWzc.jpg";
const aboutManchester2025 = "/assets/university_of_salford_campus_tour-1080p.00_00_01_09.Still001-yQlNTCzn.jpg";
const activityManchester1 = "/assets/university_of_salford_campus_tour-1080p.00_00_39_23.Still004-B2JGzIE1.jpg";
const activityManchester2 = "/assets/university_of_salford_campus_tour-1080p.00_02_57_09.Still008-vpYz5Gu8.jpg";
const activityManchester3 = "/assets/university_of_salford_campus_tour-1080p.00_04_48_24.Still010-CIjZu3XO.jpg";
const activityManchester4 = "/assets/university_of_salford_campus_tour-1080p.00_07_02_15.Still012-DNAAne-d.jpg";
const heroMoinești2025 = "/assets/Tabara-moinestib-DzPVHvKN.jpg";
const heroPoianaMarului2025 = "/assets/Tabara-poiana-maruluiB-BJmSC7pW.jpg";
const heroPredeal2024 = "/assets/predeal-b-BkUGZM_U.jpg";
const predealAbout = "/assets/predealAbout-DxygN-x4.webp";
const liddingtonHero = "/assets/Liddington2-4gMgkETk.jpg";
const liddingtonAbout = "/assets/Liddington-harta-scaled-D06gR3tx.jpg";
const activityLiggdington1 = "/assets/activitati-1-CSfMIdEc.jpg";
const activityLiggdington2 = "/assets/activitati-2-uHokmory.jpg";
const activityLiggdington3 = "/assets/activitati-3-BkpyYY1v.jpg";
const activityLiggdington4 = "/assets/Liddington-cazare-DPvZXqkl.jpg";
const meniuLiddington = "/assets/meniu-D5XHY0C4.jpg";
const heroWinchester2024 = "/assets/winchesterb-BsUWtBVR.jpg";
const aboutWinchester2024 = "/assets/winchester-1-BiD-S1UO.jpg";
const activityWinchester1 = "/assets/winchester-2-BjYXgXoQ.jpg";
const activityWinchester2 = "/assets/Queens-CeyetLKc.jpg";
const activityWinchester3 = "/assets/panel-and-post-signs-mob-banner-CFtyET7T.jpg";
const activityWinchester4 = "/assets/24-ip-winchester-centre-profile-1-1-DsLYUKQ4.jpg";
const programWinchesterImage = "/assets/24-ip-winchester-sample-programme-1-VRF-J10H.jpg";
const heroValeaOltului2023 = "/assets/Tabara-Valea-Oltului-b-CgNypllL.jpg";
const aboutValeaOltului2023 = "/assets/ValeaOltuluiAbout-DoKBfAXF.jpg";
const heroOsmington2023 = "/assets/OsmingtonB-D5ovtaG9.jpg";
const aboutOsmington2023 = "/assets/harta-centru-W-MXrNUg.jpg";
const heroPortsmouth2023 = "/assets/scoala-de-vara-de-limba-engleza-University-of-Portsmouth-B-ntUkATJv.jpg";
const aboutPortsmouth2023 = "/assets/aisel_slides_02-D1eoiaDs.png";
const activityPortsmouth1 = "/assets/Portsmouth3-BToUMoKD.jpg";
const activityPortsmouth2 = "/assets/portsmouth-3-BJrHguTn.jpg";
const activityPortsmouth3 = "/assets/portsmouth-2-cjH71Z95.jpg";
const activityPortsmouth4 = "/assets/portsmouth-1-CVjyA2IG.jpg";
const moinesti1 = "/assets/MoinestiExtra1-ICg3u5_k.jpg";
const moinesti2 = "/assets/MoinestiExtra2-DlgiFN1i.jpg";
const moinesti3 = "/assets/MoinestiExtra3-CJ5AK5mj.jpg";
const moinesti4 = "/assets/MoienstiExtra4-Y-DIgubv.jpg";
const moinesti5 = "/assets/MoinestiExtra5-D9VIgPLP.jpg";
const moinesti6 = "/assets/MoinestiExtra6-C2gl8E0_.jpg";
const moinesti7 = "/assets/Moinesti7-CsaYgJx0.jpg";
const moinesti8 = "/assets/Moinesti8-DbIgeLTr.jpg";
const poianaMarului1 = "/assets/PoianaExtra1-NKEpRohb.jpg";
const poianaMarului2 = "/assets/PoianaExtra2-CIpSI_oT.jpg";
const poianaMarului3 = "/assets/PoianaExtra3-Bk-PirBB.jpg";
const poianaMarului4 = "/assets/PoianaExtra4-COzf-g7f.jpg";
const poianaMarului5 = "/assets/PoianaExtra5-BwC3k_Gn.jpg";
const poianaMarului6 = "/assets/PoianaExtra6-DF1WYYH0.jpg";
const poianaMarului7 = "/assets/Poiana7-Hrr1Mhlr.jpg";
const poianaMarului8 = "/assets/Poiana8-BVQImspp.jpg";
const SITE_URL = "https://tabere.proerudio.ro";
function getCampSEO(camp) {
  const title = `${camp.campName} | Pro Erudio`;
  const description = (camp == null ? void 0 : camp.shortDescription) || (camp == null ? void 0 : camp.description) || "Descoperă tabăra Pro Erudio: program, locație, activități și înscriere.";
  const image = `${SITE_URL}/og/${camp.slug}.jpg`;
  return { title, description, image };
}
const DEFAULT_REGISTRATION = {
  steps: [
    "Pentru rezervări vă rugăm să completaţi formularul din partea de jos a paginii sau să ne trimiteţi un email.",
    "Plata avansului se face după confirmarea locului și a logisticii (transport/cazare) pentru grup.",
    "Pentru orice alte informaţii, vă rugăm să nu ezitaţi să ne contactaţi la telefon sau pe email."
  ],
  contact: {
    phone: "0741 389 897 (Roxana Popescu)",
    email: "office@proerudio.ro"
  }
};
const DEFAULT_REQUIRED_DOCS = [
  "Formularul de înscriere completat",
  "Copie CI/Pașaport (în funcție de destinație)",
  "Declarație notarială cu acordul ambilor părinți (pentru taberele externe)",
  "Avans la înscriere (conform ofertei)"
];
const ROMANIA_REQUIRED_DOCS = [
  "Formularul de înscriere completat",
  "Avans la înscriere (conform ofertei)"
];
const IMGSET_DEFAULT = [activity1, activity2, activity3, activity4];
function makeFacilities(kind) {
  if (kind === "uk") {
    return [
      { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
      { icon: Dumbbell, label: "Centre sportive" },
      { icon: Clapperboard, label: "Studiouri media / de dans" },
      { icon: Waves, label: "Piscină interioară" },
      { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
      { icon: Library, label: "Bibliotecă și librării" },
      { icon: Circle, label: "Terenuri de fotbal" },
      { icon: Home, label: "Sală de festivități" },
      { icon: Utensils, label: "Cantină" },
      { icon: Coffee, label: "Cafenea" },
      { icon: Store, label: "Magazine" }
    ];
  }
  if (kind === "winchester") {
    return [
      { icon: School, label: "Săli de clasă bine echipate, inclusiv săli multimedia" },
      { icon: Dumbbell, label: "Centre sportive" },
      { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
      { icon: Circle, label: "Terenuri de sport (fotbal, baschet, volei, badminton etc.)" },
      { icon: Home, label: "Sală de festivități" },
      { icon: Users, label: "Spații comune" },
      { icon: Sofa, label: "IP Ocean Lounge (spațiu de socializare deschis toată ziua)" },
      { icon: Utensils, label: "Cantină" },
      { icon: Coffee, label: "Cafenea" },
      { icon: Store, label: "Magazine" }
    ];
  }
  if (kind === "liddington") {
    return [
      { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
      { icon: Dumbbell, label: "Sală de sport" },
      { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
      { icon: Circle, label: "Terenuri de sport" },
      { icon: Home, label: "Sală de festivități" },
      { icon: Utensils, label: "Cantină" },
      { icon: Coffee, label: "Cafenea" },
      { icon: Store, label: "Minimarket" },
      { icon: Users, label: "Zone de divertisment și socializare" },
      { icon: Waves, label: "Acces privat la pârâul Wootton" },
      { icon: Trees, label: "Zone de plimbare" }
    ];
  }
  if (kind === "dublin") {
    return [
      { icon: School, label: "Săli de curs + workshop rooms" },
      { icon: Library, label: "Spațiu de studiu / bibliotecă" },
      { icon: MapPin, label: "Acces la obiective & transport urban" },
      { icon: Home, label: "Cazare organizată (campus/rezidență)" },
      { icon: Utensils, label: "Mese incluse conform programului" },
      { icon: Users, label: "Grup organizat + însoțitori" }
    ];
  }
  if (kind === "romania-mountain") {
    return [
      { icon: BedDouble, label: "60 de locuri în 16 camere" },
      { icon: Bath, label: "Fiecare cameră are baie proprie" },
      { icon: Utensils, label: "Restaurant" },
      { icon: Presentation, label: "Sală de conferință" },
      { icon: Trophy, label: "Teren de sport multifuncțional" },
      { icon: TentTree, label: "Terasă cu capacitate de 60 de locuri" },
      { icon: Gamepad2, label: "Loc de joacă pentru copii la exterior" },
      { icon: Trees, label: "Curte interioară cu peisaj mirific" },
      { icon: PawPrint, label: "Mică fermă de animale" },
      { icon: ParkingCircle, label: "Parcare proprie" }
    ];
  }
  if (kind === "predeal") {
    return [
      { icon: BedDouble, label: "24 de spații de cazare (apartamente și garsoniere)" },
      { icon: Bath, label: "Fiecare apartament/garsonieră are baie proprie" },
      { icon: Waves, label: "Piscină interioară" },
      { icon: Utensils, label: "Restaurant cu bucătărie românească" },
      { icon: TentTree, label: "Terasă cu deschidere spre pădure" },
      { icon: Presentation, label: "Sală de conferință (70 persoane) cu videoproiector și ecran" },
      { icon: Gamepad2, label: "Loc de joacă pentru copii la exterior" },
      { icon: Trees, label: "Curte interioară cu peisaj mirific" },
      { icon: ParkingCircle, label: "Parcare proprie" }
    ];
  }
  return [
    {
      icon: Home,
      label: "Camere cu 3 sau 4 locuri"
    },
    {
      icon: Mountain,
      label: "Grădină de vară cu 10 foișoare spațioase"
    },
    {
      icon: Building,
      label: "Centru Spa"
    },
    {
      icon: Users,
      label: "Piscină exterioară"
    },
    { icon: Trophy, label: "Teren multisport" },
    { icon: Users, label: "Loc de joacă pentru copii" },
    { icon: Building, label: "Sală multifuncțională" },
    {
      icon: Calendar,
      label: "4 saloane de evenimente"
    },
    { icon: Utensils, label: "2 restaurante" },
    { icon: Compass, label: "Parcare amenajată" }
  ];
}
const campsData = [
  // ================= 2026 =================
  {
    slug: "scoala-de-vara-dublin-2026",
    year: 2026,
    campName: "Școală de vară de limba ENGLEZĂ la Dublin",
    hero: {
      badge: "2026",
      title: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
      image: heroDublinUniversity,
      // schimbă cu o poză DCU când o ai
      imageAlt: "Școală de vară de limba ENGLEZĂ la Dublin City University (DCU) 2026",
      objectPosition: "bottom"
    },
    about: {
      title: "Descriere generală",
      paragraphs: [
        "Dublin este un centru cultural major în Irlanda, orașul în care s-au născut sau în care au trăit mulți scriitori remarcabili, cunoscuți în toată lumea. Primul scriitor de renume din Dublin a fost Jonathan Swift (1667-1745), autorul Călătoriilor lui Gulliver, dar cel mai mare dintre ei a fost James Joyce (1882-1941), care a revoluționat literatura prin romanul sau “Ulise” in 1922, roman remarcabil și prin faptul ca este plin de detalii despre Dublinul din anii 1920. Alți patru scriitori originari din Dublin și care au primit premiul Nobel pentru literatură sunt: William Butler Yeats în 1923, George Bernard Shaw în 1925, Samuel Beckett în 1969, Seamus Heaney în 1995. Dublin este cel mai mare centru de învățământ din Irlanda, cu trei universități.",
        "Universitatea din Dublin se află în centrul orașului și este cea mai veche din Irlanda, fondată în secolul XVI. Singurul său colegiu constitutiv, Trinity College (TCD) a fost consacrat printr-un act semnat de către regina Elisabeta I a Angliei. Universitatea Națională a Irlandei (NUI) fondată în 1854, este acum cea mai mare universitate din Irlanda, cea mai recentă fiind Universitatea Orașului Dublin (DCU) fondată în 1975. Această universitate este specializată în afaceri, inginerie, știința și industrie.",
        "Dublin este un important centru cultural irlandez, remarcându-se prin recunoașterea ca Oraș UNESCO al Literaturii în 2010. Orașul abundă în muzee, galerii de artă, instituții culturale și o scenă literară activă, influențată de mari scriitori și muzicieni. Dublinul dispune de o infrastructură culturală bogată, incluzând nu mai puțin de 62 de muzee, 51 de biblioteci publice, trei universități și 53 de galerii de artă."
      ]
    },
    visibility: {
      showPriceDetails: false
    },
    quickInfo: {
      location: "Dublin, Irlanda",
      duration: "8 zile / 7 nopți",
      ageGroup: "13 – 18 ani",
      dates: "2 – 9 august 2026",
      price: "940 EUR"
    },
    highlights: [
      "15 lecții de engleză / săptămână în grupuri internaționale, cu profesori nativi",
      "Cazare în campus universitar (camere duble cu baie proprie)",
      "Pensiune completă",
      "4 excursii de jumătate de zi în Dublin + 1 excursie de o zi întreagă (sâmbăta)",
      "Program zilnic de activități comune + program zilnic tematic",
      "Test inițial de evaluare + certificat de absolvire",
      "1 însoțitor Pro Erudio la 10 copii + transfer aeroport–campus"
    ],
    locationDescription: {
      title: "Dublin City University (DCU)",
      description: "Dublin City University (DCU) a fost fondată în 1980, iar de atunci a crescut de la un număr mic de studenți (200 în primul an de funcționare) la peste 19.000 de studenți astăzi. Universitatea dispune de cinci campusuri, trei dintre acestea fiind campusuri academice (Glasnevin, St. Patricks și All Hallows, unde studenții merg la cursuri, învață și socializează), unul sportiv DCU Sports Campus (întinzându-se pe 35 de hectare) și unul dedicat activităților de cercetare și inovație (DCU Alpha). \n \n Dublin City University (DCU) este o universitate tânără, dinamică și ambițioasă, care își propune să transforme viețile oamenilor prin educație, cercetare și inovație. Universitatea are o reputație excelentă, clasându-se în top 350 universități din lume, în ciuda faptului că este o universitate relativ tânără.",
      image: aboutDublin,
      // schimbă cu o poză DCU când o ai
      imageAlt: "Dublin City University (DCU)"
    },
    locationFacilities: [
      { icon: School, label: "Săli de clase bine echipate, inclusiv săli multimedia" },
      { icon: Dumbbell, label: "Centre sportive" },
      { icon: Clapperboard, label: "Studiouri media/de dans" },
      { icon: Waves, label: "Piscină interioară" },
      { icon: FlaskConical, label: "Laboratoare de științe și limbi străine" },
      { icon: Library, label: "Bibliotecă și librării" },
      { icon: Circle, label: "Terenuri de fotbal" },
      { icon: Home, label: "Sală de festivități" },
      { icon: Utensils, label: "Cantină" },
      { icon: Coffee, label: "Cafenea" },
      { icon: Store, label: "Magazine" }
    ],
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămână în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificat de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii: patru de jumătate de zi în timpul săptămânii în Dublin și una de o zi întreagă sâmbăta",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Transfer de la aeroport în campus"
    ],
    notIncludedInPrice: [
      "Transport avion (aproximativ 450 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Asigurare storno (opțional) și de călătorie"
    ],
    activitiesDescription: "Activitățile posibile sunt numeroase și variate: activități sportive în aer liber și în sala de sport multifuncțională, ateliere (actorie, fotbal, arts & crafts), cluburi de conversație, seminarii pe diferite teme și jocuri de echipă (ex: Treasure Hunt, Bingo). Sunt incluse quiz-uri, vizionări de filme, prezentări de modă și seri tematice. \n \n Excursiile includ tururi de jumătate de zi în Dublin (plimbări, shopping, vizite la Muzeul Național de Istorie, Grădina Botanică, St Stephen’s Green etc.) și o excursie de o zi întreagă (posibil la Dún Laoghaire & Bray sau Howth). \n \n Programul zilnic al școlii de vară cuprinde cursuri de limba engleză, ateliere de după-amiază (care pot fi vizite la obiective turistice din orașul Dublin) și serate dupa cină.",
    activityImages: [activityDublin1, activityDublin2, activityDublin3, activityDublin4],
    // înlocuiește cu poze DCU/cazare/masa când le ai
    registrationInfo: {
      steps: [
        "Pentru rezervări vă rugăm să completaţi formularul din partea de jos a paginii sau să ne trimiteţi un email la office@proerudio.ro.",
        "După constituirea grupului veți fi contactat pentru achiziționarea biletului de avion și achitarea avansului de 250 euro.",
        "Diferența până la prețul final al taberei se achită în alte două tranșe: una în februarie (250 euro) și una în mai (440 euro).",
        "Pentru orice alte informaţii, vă rugăm să nu ezitaţi să ne contactaţi la telefon."
      ],
      contact: {
        phone: "0724 527 838 (Roxana Popescu)",
        email: "office@proerudio.ro"
      }
    },
    requiredDocuments: [
      "Formularul de înscriere completat",
      "Pașaport sau carte de identitate valabile",
      "Declarație notarială cu acordul ambilor părinți",
      "Avans de 250 euro la înscriere"
    ],
    discounts: [
      {
        type: "Continuitate",
        value: "5%",
        condition: "Doar pentru copiii care au participat la programul de tabără din vara 2025"
      },
      {
        type: "Frați/Surori",
        value: "5%",
        condition: "Pentru doi copii ai aceleiași familii"
      }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Ce trebuie să conțină bagajul copiilor" },
    programImage: { src: programDublinImage, alt: "Program orientativ școală de vară Dublin" },
    // aici poți lăsa default sau îl poți scoate dacă oricum îl pui mereu explicit
    // (dar în structura ta CampPage se așteaptă să existe)
    form: {
      selectValue: "scoala-de-vara-dublin-2026",
      selectLabel: "Școală de vară de limba ENGLEZĂ la Dublin (DCU) 2026"
    }
  },
  {
    slug: "tabara-marea-britanie-grosvenor-hall-2026",
    year: 2026,
    campName: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
    hero: {
      badge: "2026",
      title: "Tabără în Marea Britanie – Grosvenor Hall Activity Centre",
      image: heroGrosvenor,
      imageAlt: "Grosvenor Hall 2026",
      objectPosition: "50% 80%"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    quickInfo: {
      location: "Grosvenor Activity Centre",
      duration: "8 zile / 7 nopți",
      ageGroup: "11 – 16 ani",
      dates: "25 iulie – 01 august 2026",
      price: "740 GPB"
    },
    highlights: [
      "Cursuri de engleză cu profesori vorbitori nativi (dacă se aplică)",
      "Aventură: activități outdoor & indoor",
      "Jocuri și competiții în echipă",
      "Seri tematice și activități de socializare",
      "Excursii la obiective locale",
      "Suport complet și însoțitori"
    ],
    locationDescription: {
      title: "Grosvenor Hall Activity Centre",
      description: "Centrul de aventură în care vom merge anul acesta, Grosvenor Hall din Kent, este situat pe coasta de sud-vest a Angliei, aproape de orașul Dover și la două ore distanță de Londra. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de peste 1000 de locuri și se întinde pe 50 de hectare de teren. Grosvenor Hall este un fost conac care cuprinde, pe langă pădure și zone întinse de gazon, un lac spectaculos. Din primul moment când intri in centrul de activități simți că te cuprinde un fior de adrenalină, iar pe măsură ce descoperi tot ceea ce oferă, îți dai seama că aici se găsește ceva de făcut pentru toate gusturile. Centrul de activități Grosvenor Hall cuprinde peste 20 de zone de aventură: terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri, lacuri, păduri etc, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
      image: heroGrosvenor,
      imageAlt: "Grosvenor Hall"
    },
    locationFacilities: makeFacilities("uk"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (una de jumătate de zi și una de o zi întreagă săptămânal)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii"
    ],
    notIncludedInPrice: [
      "transport avion (250-350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în funcție de numărul copiilor înscriși la tabără și se achită cu o lună înaintea plecării)",
      "Asigurare storno/ de călătorie"
    ],
    activitiesDescription: "Activitățile din tabără sunt numeroase și foarte variate, fiind concepute atât pentru participare individuală, cât și pentru lucrul în echipă, toate fiind disponibile în cadrul centrului, chiar dacă nu se poate anticipa exact care dintre ele vor fi desfășurate în săptămâna în care grupul va fi prezent. Printre activitățile de zi se numără: Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire. Seara, programul continuă cu activități interactive și recreative precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races. Pe lângă aceste experiențe, participanții vor descoperi istoria și cultura zonei prin două excursii, una de o zi întreagă și una de jumătate de zi, cu posibile destinații două dintre următoarele orașe: Dover (cu vizitarea castelului), Portsmouth (cu vizitarea castelului), Cambridge (unde se face punting pe râu), Canterbury (cu vizitarea catedralei), Brighton (cu intrare la Brighton Sea Life Centre) și Leeds (cu vizitarea castelului).",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Doar pentru copiii care au participat la programul de tabără din vara 2025" },
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: [
      "Formularul de înscriere completat",
      "Pașaport",
      "Declarație notarială cu acordul ambilor părinți",
      "Avans de 250 GBP la înscriere",
      "Autorizație de călătorie în Marea Britanie (ETA)"
    ],
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Tabara in Marea Britanie Grosvenor Hall Activity Centre 2026"
    }
  },
  {
    slug: "tabara-moinesti-2026",
    year: 2026,
    campName: "Tabără de limba engleză și aventură în România – Moinești",
    hero: {
      badge: "2026",
      title: "Tabără de limba engleză și aventură în România – Moinești",
      image: heroMoinești,
      imageAlt: "Tabără Moinești 2026",
      objectPosition: "50% 70%"
    },
    about: {
      title: "Despre tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "note",
        text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este de 2.480 lei (totul inclus: pensiune completă, cursuri, excursii, transport din București). După această dată prețul poate suferi modificări."
      },
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Oprire la benzinărie pentru gustare",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 3",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.30 – Vizită la *Cetatea Neamț*",
              "17.00 – Bălăceală în piscină",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 4",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – Vizită la *Casa Memorială Ion Creangă*",
              "15.30 – Vizită la *Curtea Domnească* de la Piatra Nemți",
              "17.00 – Bălăceală în piscină",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.00 – Plecare de la pensiune",
              "14.00 – Oprire la benzinărie pentru o gustare",
              "18.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază sunt creative, sportive, artistice și culturale și se vor desfășura pe echipe de 7-9 copii. Iată câteva exemple:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Moinești, Județul Bacău",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "28 iunie – 03 iulie 2026",
      price: "2.480 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Moinești – tabără activă în România",
      description: "Mario Resort & Event Center Moinești este situat în municipiul Moinești aflat în N-V județului Bacău, în bazinul mijlociu al sistemului de râuri Trotuș-Tazlău, localitate aflata la o distanta de 46 km de Bacău, 8 km de Comănești, 30 km de Tg. Ocna, 44 km de Slănic Moldova și 42 km de Onești.\n \n Cazarea se face în camere duble, triple sau de patru locuri, în funcție de disponibilitatea complexului. În funcție de gradul de ocupare, cazarea se va face la Hotel Mario, Hotel Topaz sau Hotel Safir. Momentan, noi am rezervat 50 de locuri, dar complexul are o capacitate de peste 200 de locuri.",
      image: moinestiAbout,
      imageAlt: "Moinești"
    },
    locationFacilities: makeFacilities("romania-city"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la *Curtea Domnească* din Piatra Neamț;",
      "Vizită la *Cetatea Neamț*;",
      "Vizită la *Casa Memorială Ion Creangă*;",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    galleries: {
      includedInPrice: [
        moinesti1,
        moinesti5,
        moinesti3
      ],
      notIncludedInPrice: [
        moinesti7,
        moinesti8
      ],
      other: [
        moinesti4,
        moinesti2,
        moinesti6
      ]
    },
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-poiana-marului-2026",
    year: 2026,
    campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
    hero: {
      badge: "2026",
      title: "Tabără de limba engleză și aventură în România – Poiana Mărului",
      image: heroPoianaMarului,
      imageAlt: "Tabără Poiana Mărului 2026",
      objectPosition: "70% 80%"
    },
    galleries: {
      includedInPrice: [
        poianaMarului1,
        poianaMarului5,
        poianaMarului3
      ],
      notIncludedInPrice: [
        poianaMarului7,
        poianaMarului8
      ],
      other: [
        poianaMarului4,
        poianaMarului2,
        poianaMarului6
      ]
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "note",
        text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2026, prețul este 2380 lei. După această dată prețul poate suferi modificări."
      },
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la *Cetățile Hărman* și *Prejmer*",
              "12.00 – Vizită la *Casa Memorială George Enescu* din Sinaia",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2-5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Disco",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.30 – Plecare de la pensiune",
              "14.00 – Oprire la benzinărie pentru o gustare",
              "18.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)",
          "Seratele se organizează cu tot grupul pentru a le da copiilor ocazia să se împrietenească și cu alți copii, nu doar cu colegii de la activități. Seratele sunt interactive și distractive pentru a consumă și ultimele fărâme de energie ale copiilor și a le asigura un somn adânc toată noaptea."
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Poiana Mărului, Județul Brașov",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "12 – 17 iulie 2026",
      price: "2380 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Poiana Mărului – tabără activă în România",
      description: "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
      image: poianaMaruluiAbout,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("romania-mountain"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Poiana Mărului, tur-retur cu autocarul;",
      "Vizită la *Cetatea Hărman*;",
      "Vizită la *Cetatea Prejmer*;",
      "Vizită la *Peștera Valea Cetății*;",
      "Drumeție în pădure și construire de adăposturi în echipe;",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-poiana-marului-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Poiana Mărului 2026"
    }
  },
  // ================= 2025 =================
  {
    slug: "tabara-marea-britanie-manchester-2025",
    year: 2025,
    campName: "Școală de vară de limba engleză în Marea Britanie – Manchester",
    hero: {
      badge: "2025",
      title: "Școală de vară de limba engleză în Marea Britanie – Manchester",
      image: heroManchester2025,
      imageAlt: "Manchester 2025"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Primul mare oraș modern din Marea Britanie, orașul Manchester își datorează caracterul unic trecutului istoric, situându-se în inima Revoluției Industriale când noua pătură socială îmbogățită în special din industria textila a ajutat la înființarea primelor instituții educaționale și a deschis drumul catre educarea clasei muncitoare. Spiritul revoluționar și progresist infuzează atât istoria orașului, cât și pe cea a universității. Mișcările sindicale și mișcările feministe (mișcare sufragetelor) își au aici originile, iar inovații în știință și inginerie cum ar fi puterea atomică, primele programe pe calculator și cel mai tare material din lume (grafenul) continuă să uimească până în zilele noastre.",
        "Cu reputația că dă tonul in sport, cultură și industrie, în 2024 orașul Manchester a fost nominalizat in primele 12 cele mai frumoase locuri de vizitat din lume de către publicația The New York Times. În 2016 Manchester a fost onorat cu titulatura de Oraș European al Științelor. Faimoasele echipe de fotbal din Manchester (Manchester United și Manchester City), alături de facilități de fitness excelente, de la terenuri de cricket până la velodrome dau orașului un aer sportiv. Majoritatea muzeelor și a galeriilor de arta au intrare liberă, ceea ce face ușor de accesat moștenirea culturală a orașului, iar rețeaua de transport în comun facilitează conectarea tuturor zonelor la tarife cu discount pentru elevi."
      ]
    },
    quickInfo: {
      location: "University of Salford, Manchester",
      duration: "8 zile / 7 nopți",
      ageGroup: "12–17 ani",
      dates: "27 iulie – 03 august 2025",
      price: "940 GBP"
    },
    highlights: [
      "Engleză în context real (oraș universitar)",
      "Excursii & obiective locale",
      "Activități de grup",
      "Proiecte & conversație",
      "Suport complet și însoțitori",
      "Experiență internațională"
    ],
    locationDescription: {
      title: "Școala",
      description: "Universitatea din Manchester este cea mai mare universitate din Marea Britanie, fiind formată în 2004 din fuziunea dintre Victoria University of Manchester și UMIST (University of Manchester Institute of Science and Technology). Universitatea din Manchester este o universitate de cărămidă roșie, un produs al mișcării civice universitare de la sfârșitul secolului al XIX-lea. Campusul principal este la sud de centrul orașului Manchester pe Oxford Road. În 2016-2017, universitatea avea 40.490 de studenți și 10.400 de angajați, ceea ce a făcut-o a doua universitate din Marea Britanie (din 167 inclusiv Universitatea Deschisă) și cea mai mare universitate cu un singur loc. Universitatea avea un venit consolidat de 1 miliard de lire sterline în perioada 2017-2018, din care 298.7 milioane de lire sterline proveneau din subvenții și contracte de cercetare (locul 6 la nivel național, după Oxford, UCL, Cambridge, Imperial și Edinburgh). Campusul universitar al Universitatii Salford se situează în apropierea centrului orașului (20 de minute de mers pe jos) și este dotat cu săli de clasă moderne, amfiteatre, numeroase facilități sportive, precum și sală multifuncțională la interior și piscină.",
      image: aboutManchester2025,
      imageAlt: "Manchester"
    },
    locationFacilities: makeFacilities("uk"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (două de jumătate de zi și una de o zi întreagă)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Asigurare de călătorie"
    ],
    notIncludedInPrice: [
      "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
      "Asigurare storno (optional)",
      "Cheltuieli personale"
    ],
    activitiesDescription: "Activitățile din tabără sunt numeroase și extrem de variate, fiind gândite pentru a îmbina mișcarea, creativitatea și socializarea: participanții vor lua parte la activități sportive desfășurate atât în aer liber, cât și în sala de sport multifuncțională, la ateliere de cooking, dans, actorie și fotbal, precum și la sesiuni de arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă (precum Capture the Flag), jurnalism și media. \n \n Programul include, de asemenea, quiz-uri, vizionări de filme, prezentări de modă și seri tematice, alături de două excursii de o jumătate de zi pentru descoperirea orașului Manchester (cu posibile vizite la MediaCity, Muzeul Științei și Industriilor sau turul Stadionului Manchester City) și o excursie de o zi întreagă, cu destinații posibile precum York, Chester sau Liverpool.",
    activityImages: [activityManchester2, activityManchester3, activityManchester4, activityManchester1],
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
      { type: "Frați", value: "5%", condition: "Completează dacă se aplică" }
    ],
    otherCamps: [
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      },
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    luggageImage: { src: menuImage, alt: "Bagaj recomandat", title: "Exemplu meniu zilnic" },
    programImage: { src: programUK, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: DEFAULT_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025"
    }
  },
  {
    slug: "tabara-poiana-marului-2025",
    year: 2025,
    campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
    hero: {
      badge: "2025",
      title: "Tabăra de limba engleză și aventură English Explorers Camp",
      image: heroPoianaMarului2025,
      imageAlt: "Tabără Poiana Marului 2025"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la *Mănăstirea Rupestră* de la Șinca Veche;",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2 - 5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.00 – Plecare de la pensiune",
              "14.00 – Vizită la *Casa Memorială Nicolae Grigorescu* din Câmpina;",
              "17.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Poiana Mărului, Județul Brașov",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "13 – 18 iulie 2025\n20 – 25 iulie 2024",
      price: "2.280 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Poiana Mărului – tabără activă în România",
      description: "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
      image: poianaMaruluiAbout,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("romania-mountain"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la Curtea Domnească din Piatra Neamț;",
      "Vizită la Cetatea Neamț;",
      "Vizită la Casa Memorială Ion Creangă;",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-moinesti-2025",
    year: 2025,
    campName: "Tabără de limba engleză și aventură în România – Moinești",
    hero: {
      badge: "2025",
      title: "Tabără de limba engleză și aventură în România – Moinești",
      image: heroMoinești2025,
      imageAlt: "Tabără Moinești 2025"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "note",
        text: "Pentru rezervările cu avans efectuate până la data de 15 februarie 2025, prețul este 2380 lei. După această dată prețul poate suferi modificări."
      },
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Oprire la benzinărie pentru gustare",
              "14.30 – Cazare și prânz",
              "16.30-18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 3",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – Vizită la *Casa Memorială George Bacovia* din Bacău",
              "15.30 – Vizită la *Casa Memorială Mihail Sadoveanu* din Bacău",
              "17.00 – Bălăceală în piscină",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 4",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – Vizită la *Castelul Ghica* din Dofteana (reședință de vânătoare)",
              "15.30 – Vizită la *Palatul Ghica* de la Comănești (acum muzeu de etnografie și artă)",
              "17.00 – Bălăceală în piscină",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.00 – Plecare de la pensiune",
              "14.00 – Oprire la benzinărie pentru o gustare",
              "18.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Moinești, Județul Bacău",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "29 iunie – 04 iulie 2025",
      price: "2380 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Moinești – tabără activă în România",
      description: "Mario Resort & Event Center Moinești este situat în municipiul Moinești aflat în N-V județului Bacău, în bazinul mijlociu al sistemului de râuri Trotuș-Tazlău, localitate aflata la o distanta de 46 km de Bacău, 8 km de Comănești, 30 km de Tg. Ocna, 44 km de Slănic Moldova și 42 km de Onești. Cazarea se face în camere duble, triple sau de patru locuri, în funcție de disponibilitatea complexului. În funcție de gradul de ocupare, cazarea se va face la Hotel Mario, Hotel Topaz sau Pensiunea Mario. Momentan, noi am rezervat 50 de locuri, dar complexul are o capacitate de peste 200 de locuri.",
      image: moinestiAbout,
      imageAlt: "Moinești"
    },
    locationFacilities: makeFacilities("romania-city"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la *Casa Memorială George Bacovia* din Bacău;",
      "Vizită la *Casa Memorială Mihail Sadoveanu* din Bacău",
      "Vizită la *Castelul Ghica* din Dofteana (reședință de vânătoare);",
      "Vizită la *Palatul Ghica* de la Comănești (acum muzeu de etnografie și artă);",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  // ================= 2024 =================
  {
    slug: "tabara-predeal-2024",
    year: 2024,
    campName: "Tabără de limba engleză și aventură în România – Predeal",
    hero: {
      badge: "2024",
      title: "Tabăra de limba engleză și aventură English Explorers Camp",
      image: heroPredeal2024,
      imageAlt: "Tabără Predeal 2024"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la *Conacul Bellu* din Urlați;",
              "12.00 – Vizită la *Casa Memorială George Enescu* din Sinaia;",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2 - 5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.30 – Plecare de la pensiune",
              "14.00 – Vizită la *Muzeul Trenulețelor* din Sinaia",
              "14.00 – Vizită la *Muzeul Casa de Târgoveț Hagi Prodan* din Ploiești",
              "17.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Predeal, Județul Prahova",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "30 iunie – 05 iulie 2024",
      price: "2.280 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Predeal – tabără activă în România",
      description: "Staţiunea Predeal este situatã în centrul României pe Valea Prahovei, între râurile Prahova şi Timiş, la poalele munţilor Bucegi (la nord-est de aceştia) şi cele ale munţilor Baiului (la nord-vest). \n \nOraşul Predeal este cel mai înalt oras din țară, aflat la altitudinea de 1030m-1110m și o destinație de călătorie adorată de bucureșteni. Oraşul Predeal oferã privelişti încântãtoare, fiind recomandat atât pentru recreere, cât şi pentru refacere din convalescenţã prin aerul sãu cu umiditate ridicatã şi nepoluat. \n \n Hotel Hera 3*** oferă oaspeților săi o oază de confort în mijlocul naturii în orice perioadă a anului. Structura inedită de cazare include 20 apartamente și 4 garsoniere cu suprafețe foarte generoase, dotări complete și vedere spectaculoasă asupra împrejurimilor.",
      image: predealAbout,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("predeal"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la *Conacul Bellu* din Urlați;",
      "Vizită la *Casa Memorială George Enescu* din Sinaia;",
      "Vizită la *Casa de Târgoveț Hagi Prodan* din Ploiești;",
      "Vizită la *Muzeul Trenulețelor* din Sinaia;",
      "Drumeție la *Cabana Trei Brazi*;",
      "Traseu pe aventura parc (optional);",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-poiana-marului-2024",
    year: 2024,
    campName: "Tabără de limba engleză și aventură în România – Poiana Mărului",
    hero: {
      badge: "2024",
      title: "Tabăra de limba engleză și aventură English Explorers Camp",
      image: heroPoianaMarului2025,
      imageAlt: "Tabără Poiana Marului 2024"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la *Mănăstirea Rupestră* de la Șinca Veche;",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2 - 5",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.00 – Plecare de la pensiune",
              "14.00 – Vizită la *Casa Memorială Nicolae Grigorescu* din Câmpina;",
              "17.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Poiana Mărului, Județul Brașov",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "14 – 19 iulie 2024\n21 – 26 iulie 2024",
      price: "2.180 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Poiana Mărului – tabără activă în România",
      description: "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
      image: poianaMaruluiAbout,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("romania-mountain"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la Curtea Domnească din Piatra Neamț;",
      "Vizită la Cetatea Neamț;",
      "Vizită la Casa Memorială Ion Creangă;",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-marea-britanie-2024",
    year: 2024,
    campName: "Tabără în Marea Britanie – Little Canada Activity Centre",
    hero: {
      badge: "2024",
      title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
      image: liddingtonHero,
      imageAlt: "Little Canada Activity Centre"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabără internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singura diferență este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi."
      ],
      // 👇 NOU – doar pentru această tabără
      extraTitle: "Cu cine colaborăm?",
      extraParagraphs: [
        "PGL Travel este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    quickInfo: {
      location: "Little Canada Activity Centre",
      duration: "8 zile / 7 nopți",
      ageGroup: "11–15 ani",
      dates: "27 iulie – 03 august 2024",
      price: "730 GBP"
    },
    highlights: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
      "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii"
    ],
    locationDescription: {
      title: "Centrul de activități Little Canada",
      description: "Centrul de activități în care vom merge anul acesta, Little Canada este amplasat pe Insula Wight, aflată pe coasta de sud a Angliei, cu iesire la Canalul Mânecii, ceea ce îi conferă un specific aparte. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de 850 de persoane, având o poziție convenabilă pe hartă, la două ore de Londra (cu autocarul) și destul de aproape de obiective turistice importante (Carisbrooke Castle, Isle of Wight Zoo, Tiger and Big Cat Sanctuary, Amazon World, Osborne House, Robin Hill Adventure Park etc), dar si de porturi, cum ar fi Portsmouth și Ryde. \n \n Centrul de pe Insula Wight este amplasat pe malurile pârâului Wootton, la doar 10 minute de port și cuprinde 24 de zone de aventură (terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri etc ) întinse pe 48 de hectare de teren, centrul de activitati pe apa de la Portland (care a fost gazdă Olimpiadei sporturilor de apa din 2012) si acces direct la mare si plaja, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
      image: liddingtonAbout,
      imageAlt: "Manchester"
    },
    locationFacilities: makeFacilities("liddington"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (două de jumătate de zi și una de o zi întreagă)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Asigurare de călătorie"
    ],
    notIncludedInPrice: [
      "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
      "Asigurare storno (optional)",
      "Cheltuieli personale"
    ],
    activitiesDescription: "Activitățile desfășurate în cadrul taberei sunt numeroase și extrem de variate, fiind concepute pentru a stimula spiritul de aventură, lucrul în echipă și dezvoltarea personală a participanților. După-amiaza, copiii pot lua parte la activități precum Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire, fiecare dintre acestea fiind adaptată nivelului de vârstă și desfășurată în condiții de siguranță. Seara este dedicată activităților recreative și de socializare, incluzând jocuri și evenimente precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races, menite să consolideze relațiile dintre participanți și să creeze experiențe memorabile într-o atmosferă relaxată și distractivă.",
    activityImages: [activityLiggdington1, activityLiggdington2, activityLiggdington3, activityLiggdington4],
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
      { type: "Frați", value: "5%", condition: "Completează dacă se aplică" }
    ],
    otherCamps: [
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      },
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    sections: [
      {
        type: "richText",
        title: "Posibile destinații de excursii",
        paragraphs: [
          "Portsmouth Historic Dockyard și HMS Victory, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Carisbrooke Castle și Newtown",
          "Robin Hill Country Park si Blackgand Chine",
          "Isle of Wight Zoo (Tiger and Cat Sanctuary)",
          "Osborne House"
        ]
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj Tabara", title: "Ce trebuie să conțină bagajul copiilor" },
    programImage: { src: programImage, alt: "Program orientativ" },
    menuImage: { src: meniuLiddington, alt: "Meniu orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: DEFAULT_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025"
    }
  },
  {
    slug: "scoala-de-vara-marea-britanie-2024",
    year: 2024,
    campName: "Școală de vară de limba engleză în Marea Britanie – Winchester",
    hero: {
      badge: "2024",
      title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
      image: heroWinchester2024,
      imageAlt: "University of Winchester"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Una dintre cele mai frumoase destinații turistice ale Marii Britanii, Winchester este un oraș pitoresc situat pe malurile râului Itchen și cunoscut ca centru istoric și cultural al ținutul Hampshire. Orașul este faimos pentru catedrala Winchester, care are cel mai lung naos medieval din Europa, si pentru Colegiul Winchester, una dintre cele mai vechi instituții de învățământ din Marea Britanie, fondat de Episcopul William de Wykeham în 1382 ca școală de baieți.",
        "La mai puțin de 100 de kilometri distanta de Londra, orașul Winchester este locul în care a trăit și scris Jane Austen, una dintre cele mai importante scriitoare ale secolului al XIX-lea. Tot aici găsim și The Great House sau Chawton House, un conac englezesc vechi de peste 400 ani, locul preferat de Jane Austen ca spațiul de desfășurare a acțiunii în romanele sale"
      ],
      // 👇 NOU – doar pentru această tabără
      extraTitle: "",
      extraParagraphs: [
        ""
      ]
    },
    quickInfo: {
      location: "University of Winchester",
      duration: "8 zile / 7 nopți",
      ageGroup: "12 – 18 ani",
      dates: "27 iulie – 03 august 2024",
      price: "890 GBP"
    },
    highlights: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
      "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii"
    ],
    locationDescription: {
      title: "",
      description: "Începuturile Universității Winchester și ale orașului sunt strâns legate de Colegiul Winchester, care a fost înființat prin eforturile Episcopului Wykeham, ulterior ajuns Cancelar al Angliei. Cariera lui Wykeham i-a permis dobândirea de averi uriașe, pe care le-a folosit pentru fondarea a două colegii importante chiar și astăzi: New College Oxford și Winchester College. Acestea urmau să furnizeze educație pentru 70 savanți sub motto-ul Manierele fac omul. Acest motto (Manners Makyth Man) încă ghiează viețile celor 700 de elevi care învață la Colegiul Winchester astăzi. \n \n Universitatea din Winchester a fost initial o mică insitituție de formare a profesorilor fondată de Biserica Anglicană în anul 1840. Acum, la această universitate studiază peste 9000 de tineri care pot alege dintre discipline de studiu cum ar fi: artele, managementul afacerilor, tehnologiile digitale, dreptul, medicina, științele sociale etc. Ceremonia de absolvire se ține la Catedrala Winchester, un reper istoric important pentru această zonă geografică.",
      image: aboutWinchester2024,
      imageAlt: "Winchester"
    },
    locationFacilities: makeFacilities("winchester"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (două de jumătate de zi și una de o zi întreagă)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Asigurare de călătorie"
    ],
    notIncludedInPrice: [
      "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
      "Asigurare storno (optional)",
      "Cheltuieli personale"
    ],
    activitiesDescription: "Activitățile desfășurate în cadrul taberei sunt numeroase și foarte variate, oferind participanților ocazia de a explora și de a se bucura de experiențe educative, sportive și recreative. Programul include vizitarea orașului, cu activități de shopping și orientare, activități sportive în aer liber și în sala de sport multifuncțională, precum și o gamă largă de ateliere interactive, printre care se numără dans, zumba, actorie, arts & crafts, frisbee, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă, treasure hunt, escape rooms, ateliere de înfrumusețare, tatuaje cu henna și ateliere de preparare a clătitelor. Serile sunt dedicate activităților de divertisment și socializare, incluzând quiz-uri, vizionări de filme, prezentări de modă, seri tematice, karaoke, mima, jocuri de tip Cluedo, precum și board games, toate contribuind la crearea unei atmosfere dinamice și memorabile.",
    activityImages: [activityWinchester1, activityWinchester2, activityWinchester3, activityWinchester4],
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
      { type: "Frați", value: "5%", condition: "Completează dacă se aplică" }
    ],
    otherCamps: [
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      },
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    programImage: { src: programWinchesterImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: DEFAULT_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025"
    }
  },
  // ================= 2023 =================
  {
    slug: "tabara-de-engleza-poiana-marului-2023",
    year: 2023,
    campName: "Tabăra de Engleză - Poiana Mărului",
    hero: {
      badge: "2023",
      title: "Tabăra de limba engleză și aventură English Explorers Camp",
      image: heroPoianaMarului2025,
      imageAlt: "Tabără Poiana Marului 2023"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la Gradina Zoologica si *Manastirea Dealu* din Târgoviște;",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2 - 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 7",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.30 – Plecare de la pensiune",
              "14.00 – Vizită la *Peștera Ialomița*;",
              "17.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Poiana Mărului, Județul Brașov",
      duration: "6 zile / 5 nopți",
      ageGroup: "7-14 ani",
      dates: "09 – 14 iulie 2023\n16 – 21 iulie 2023",
      price: "1.980 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Poiana Mărului – tabără activă în România",
      description: "Poiana Mărului este o stațiune de munte situată la 6 km de zona Bran-Moeciu, la 12 km de Râșnov, 12 km de Poiana Brașov și la o altitudine de 900m. Stațiunea suprinde și încântă prin sălbăticia peisajului, frumusețea și naturalețea unei zone abia descoperite de lumea civilizată. \n \n Situată la 2,5 km de șoseau principală, în inima Masivului Piatra Craiului, departe de trafic și poluarea zonelor intens populate, accesul catre pensiune se face pe un drum îngust, recent construit prin padure. Astfel, Pensiunea Poiana Mărului Ranch (clasificată cu patru margarete) combina facilitatile vieții moderne cu pitorescul peisajului înca neîntinat de mâna omului.",
      image: poianaMaruluiAbout,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("romania-mountain"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la Curtea Domnească din Piatra Neamț;",
      "Vizită la Cetatea Neamț;",
      "Vizită la Casa Memorială Ion Creangă;",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-de-engleza-valea-oltului-2023",
    year: 2023,
    campName: "Tabăra de Engleză - Valea Oltului",
    hero: {
      badge: "2023",
      title: "Tabăra de limba engleză și aventură English Explorers Camp",
      image: heroValeaOltului2023,
      imageAlt: "Tabără Valea Oltului 2023"
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini.",
        "Colaborăm cu PGL Travel, care este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    sections: [
      {
        type: "twoCols",
        title: "Avantajele participării la tabăra de limba engleză și aventură",
        left: [
          "la nivel personal, copiii vor învăţa să fie mai responsabili, independenți și îşi vor testa limitele într-un mediu controlat şi în siguranţă;",
          "la nivel interpersonal, copiii îşi vor face noi prieteni, vor învăţa să se joace tot felul de jocuri noi pe care le vor putea experimenta și cu prietenii de acasă, vor învăţa ce înseamnă munca în echipă şi sprijinul unui grup unit;",
          "la nivel lingvistic, copiii îşi vor îmbunătăţi cunoştinţele de limbă engleză cu accent pe receptarea și transmiterea de mesaje, îmbunătățirea fluenței în exprimare și a spontaneității și naturaleții în reacțiile la instrucțiuni primite în limba engleză;"
        ],
        right: [
          "Prin sistemul de lucru pe echipe (lucrând împreună copiii își dezvoltă sentimentul de apartenența la grup și sentimentul că fiecare contribuie la succesul echipei)",
          "Prin programul de limba engleză care se va desfășura pe două coordonate:",
          "Cursurile de limba engleză din timpul dimineții bazate pe comunicare (jocuri interactive cu profesor român de limba engleză sau trainer international)",
          "Atelierele din cursul după-amiezii și activitățile de seară se desfășoară în limba engleză și sunt susținute de echipe mixte formate din ghizi, profesori români de limba engleză și traineri internationali. Astfel, toți copiii beneficiază de interacțiunea cu animatorii, cu trainerii internaționali si cu monitorii (în special pentru atelierele care implică tehnici de supraviețuire și alte activități specifice muntelui), iar profesorii români de limba engleză acționează ca un liant între cele trei categorii asigurând astfel succesul tuturor activităților."
        ]
      },
      {
        type: "gridBullets",
        title: "Tabăra de limba engleză și aventură – Program zilnic orientativ:",
        columns: 2,
        cards: [
          {
            subtitle: "Ziua 1",
            items: [
              "8.00 – Plecarea din București cu autocarul (Piata Constitutiei)",
              "11.00 – Vizită la Gradina Zoologică din Râmnicu Vâlcea și *Mănăstirea Cozia*, Călimănești;",
              "14.30 – Cazare și prânz",
              "16.30 -18.30 – Jocuri de cunoaștere/stabilirea echipelor/prezentarea regulilor taberei",
              "19.30-20.30 – Cina",
              "20.30 – 22.00 – Scavanger Hunt",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 2 - 6",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Lesson 1 (ateliere interactive de limba engleză)",
              "11.15 – 12.45 – Lesson 2 (ateliere interactive de limba engleză)",
              "13.00 – Masa de prânz",
              "14.00 – 15.00 – Timp liber",
              "15.00 – 16.30 – Atelier 1 (activități pe echipe, la alegere)",
              "17.00 – 18.30 – Atelier 2 (activități pe echipe, la alegere)",
              "19.00 – Cina",
              "20.00 – 21.30 – Serata (activități recreative și de divertisment cu tot grupul)",
              "21.30 – 22.00 – Dans sau timp liber în camere",
              "22.30 – Stingerea"
            ]
          },
          {
            subtitle: "Ziua 7",
            items: [
              "08.00 – Deşteptarea muzicală",
              "08.30 – Înviorarea în ritm de dans",
              "09.00 – Micul dejun",
              "09.45 – 11.00 – Festivitate de premiere si socializare",
              "11.30 – Plecare de la pensiune",
              "14.00 – Vizită la *Curtea Domnească* și *Mănăstirea Curtea de Argeș*;",
              "17.00 – Sosire in Bucuresti"
            ]
          }
        ]
      },
      {
        type: "richText",
        title: "Atelierele de după-amiază se vor desfășura pe echipe de 7-9 copii și se vor desfășura în paralel. Iată câteva exemple de activități:",
        paragraphs: [
          "Jocuri de cunoaștere și socializare (Mime, draw or describe, Minute to win it, curse de stafeta, Guess the character!, Photo contests, Charades, Casino Night, Chaos Games, Media Challenges, Beauty Workshop, Fashion Parade etc )",
          "Concursuri pe echipe (Treasute Hunt, Team Feuds, Talent Show, Harry Potter Night, Quiz Night, Karaoke etc)",
          "Activități artistice (confecționare brățări, pictură în natură, origami, modelare în plastilină)",
          "Activități sportive (fotbal, volei, tenis, baschet, dodgeball, Capture the Flag etc.)"
        ]
      }
    ],
    visibility: {
      showAbout: false,
      showProgramImage: false,
      showLuggageImage: false,
      showActivities: false,
      showDiscounts: false
    },
    quickInfo: {
      location: "Valea Oltului, Vâlcea",
      duration: "6 zile / 5 nopți",
      ageGroup: "7 - 14 ani",
      dates: "25 – 30 iunie 2023",
      price: "2.080 Lei"
    },
    highlights: [
      "Engleză aplicată prin joc și proiecte",
      "Activități de aventură & teamwork",
      "Ateliere creative",
      "Drumeții / activități în natură (după caz)",
      "Dezvoltare personală: încredere & autonomie",
      "Program structurat și supravegheat"
    ],
    locationDescription: {
      title: "Locație",
      description: "Localitatea Brezoi se află în nordul județului Vâlcea, la confluența râului Lotru cu râul Olt, în cea mai mare depresiune intercarpatică din România, cunoscută sub numele de Țara Loviștei. Orașul este înconjurat de păduri de conifere. Brezoi se situează la 35 km nord de Râmnicu Vâlcea și la 66 km sud de Sibiu. De câtiva ani, acest orășel de munte găzduiește diferite festivaluri vara, dintre care cele mai appreciate sunt Bikers For Humanity Rock Fest și Open Air Blues Festival. \n \n Hotelul Class este situat la intrarea în orașul Brezoi când venim dinspre București, pe malul râului Olt, între versanți abrupți acoperiți de nesfârșite păduri.",
      image: aboutValeaOltului2023,
      imageAlt: "Poiana Mărului"
    },
    locationFacilities: makeFacilities("romania-mountain"),
    includedInPrice: [
      "6 zile (5 nopţi) cazare cu pensiune completă;",
      "Transport București-Moinești, tur-retur cu autocarul;",
      "Vizită la Gradina Zoologică din Râmnicu Vâlcea;",
      "Vizită la Mănăstirea Cozia, Călimănești;",
      "Vizită la Curtea Domnească și Mănăstirea Curtea de Argeș",
      "Zilnic program de activități în limba engleză în cursul diminetii, două ateliere pe echipe (artistice, culturale, sportive etc) în cursul după-amiezii si o activitate de seară (cu tot grupul);",
      "Program de limba engleză susținut de profesori de limba engleză si traineri internaționali de la “Pro Erudio” School of English;",
      "Diplome, poze, șapca echipei cadou pentru toţi copiii și medalii pentru echipa căștigătoare;"
    ],
    notIncludedInPrice: [
      "Cheltuieli personale",
      "Excursii opționale (dacă există)"
    ],
    activitiesDescription: "Activități de echipă, jocuri, mini-proiecte în engleză, provocări de aventură și sesiuni interactive. Programul final depinde de locație și grup.",
    activityImages: IMGSET_DEFAULT,
    discounts: [
      { type: "Frați/Surori", value: "5%", condition: "Pentru doi copii ai aceleiași familii" }
    ],
    otherCamps: [
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj recomandat" },
    programImage: { src: programImage, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: ROMANIA_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-moinesti-2026",
      selectLabel: "Tabără de limba engleză și aventură în România – Moinești 2026"
    }
  },
  {
    slug: "tabara-de-engleza-marea-britanie-2023",
    year: 2023,
    campName: "Tabăra de Engleză - Marea Britanie",
    hero: {
      badge: "2023",
      title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
      image: heroOsmington2023,
      imageAlt: "Osmington"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Anul acesta vă propunem o tabăra internațională care urmează tipicul unei tabere de aventură adresate copiilor britanici. Singură diferența este includerea în program a cursurilor de limba engleză în timpul dimineții și a excursiilor, săptămânal una de o zi întreagă și una de o jumătate de zi, special concepute pentru elevii străini."
      ],
      // 👇 NOU – doar pentru această tabără
      extraTitle: "Cu cine colaborăm?",
      extraParagraphs: [
        "PGL Travel este o companie fondată în anul 1957 și are ca obiect principal de activitate furnizarea de activități sportive, recreative și educaționale pentru copiii britanici și internaționali în centre proprii. De-a lungul anilor, compania a achiziționat numeroase centre, majoritatea în Marea Britanie: 10 în Anglia, 1 în Scoția și 1 în Țara Galilor. În anii 1990 PGL și-a extins activitatea în Franța, intrând chiar și pe piața școlilor de schi pentru copii. Specific fiecărui centru este faptul că se întinde pe domenii uriașe, care cuprind lacuri sau râuri, păduri, plaje sau zone stâncoase, terenuri de sport, piste de biciclete, săli de sport la interior, centre de activități de aventură, mici magazine, săli de clasă și ateliere pe diferite teme."
      ]
    },
    quickInfo: {
      location: "Osmington Bay Activity Centre",
      duration: "8 zile / 7 nopți",
      ageGroup: "11 – 18 ani",
      dates: "29 iulie – 05 august 2023",
      price: "730 GBP"
    },
    highlights: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
      "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii"
    ],
    locationDescription: {
      title: "Centrul de activități Osmington Bay",
      description: "Centrul educațional în care vom merge anul acesta, Osminton Bay din Dorset, este situat pe coasta de sud a Angliei, cu iesire la Canalul Mânecii, ceea ce îi conferă un specific aparte. Unul dintre cele mai mari centre PGL, are o capacitate de cazare de 1100 de persoane, având o poziție convenabilă pe hartă, la două ore și jumătate de Londra (cu autocarul) și destul de aproape de orasele istorice Salisbury, Bath, dar si de porturi importante, cum ar fi Portsmouth. \n \n Centrul din Osmington Bay cuprinde 24 de zone de aventură (terenuri de sport potrivite tuturor condițiilor meteo, săli de activități la interior (inclusiv sală de jocuri), teren de scrimă, ateliere de construcție plute, zonă de cățărări, zonă de trekking, tir cu arcul, tiroliană, grajduri etc ) întinse pe 42 de hectare de teren, centrul de activitati pe apa de la Portland (care a fost gazdă Olimpiadei sporturilor de apa din 2012) si acces direct la mare si plaja, astfel încât o săptămâna pare scurtă pentru câte vom avea de făcut.",
      image: aboutOsmington2023,
      imageAlt: "Osmington Bay"
    },
    locationFacilities: makeFacilities("liddington"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (două de jumătate de zi și una de o zi întreagă)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Asigurare de călătorie"
    ],
    notIncludedInPrice: [
      "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
      "Asigurare storno (optional)",
      "Cheltuieli personale"
    ],
    activitiesDescription: "Activitățile desfășurate în cadrul taberei sunt numeroase și extrem de variate, fiind concepute pentru a stimula spiritul de aventură, lucrul în echipă și dezvoltarea personală a participanților. După-amiaza, copiii pot lua parte la activități precum Abseiling, Aeroball, Archery, Buggy Building, Canoeing, Challenge Course, Climbing, Crate Challenge, Fencing, Giant Swing, Jacob’s Ladder, Orienteering, Problem Solving, Raft Building, Sensory Trail, Survivor, Trapeze, Vertical Challenge și Zip Wire, fiecare dintre acestea fiind adaptată nivelului de vârstă și desfășurată în condiții de siguranță. Seara este dedicată activităților recreative și de socializare, incluzând jocuri și evenimente precum Ambush, Campfire, Capture the Flag, Disco, Passport to the World, PGL Sports Night, Photo Challenge, Robot Wars, Quiz Show, Snap Shot, Splash și Wacky Races, menite să consolideze relațiile dintre participanți și să creeze experiențe memorabile într-o atmosferă relaxată și distractivă.",
    activityImages: [activityLiggdington1, activityLiggdington2, activityLiggdington3, activityLiggdington4],
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
      { type: "Frați", value: "5%", condition: "Completează dacă se aplică" }
    ],
    otherCamps: [
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      },
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    sections: [
      {
        type: "richText",
        title: "Posibile destinații de excursii",
        paragraphs: [
          "Stonehenge & Salisbury",
          "Weymouth",
          "Bath",
          "Corfe Castle",
          "Dorchester",
          "Bournemouth"
        ]
      }
    ],
    luggageImage: { src: kitTabaraImage, alt: "Bagaj Tabara", title: "Ce trebuie să conțină bagajul copiilor" },
    programImage: { src: programImage, alt: "Program orientativ" },
    menuImage: { src: meniuLiddington, alt: "Meniu orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: DEFAULT_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025"
    }
  },
  {
    slug: "scoala-de-vara-marea-britanie-2023",
    year: 2023,
    campName: "Școală de vară - Marea Britanie",
    hero: {
      badge: "2023",
      title: "TABĂRĂ educațională de limba ENGLEZĂ în Marea Britanie",
      image: heroPortsmouth2023,
      imageAlt: "Portsmouth"
    },
    visibility: {
      showPriceDetails: false
    },
    about: {
      title: "Despre Tabără",
      paragraphs: [
        "Una dintre cele mai frumoase destinații turistice ale Marii Britanii, Portsmouth este un oras pitoresc situat pe coasta de sud a Marii Britanii și este unul dintre cele mai importante porturi ale Regatului Unit, cu o populatie de aproape 250.000 de locuitori si o densitate a populatie pe metru patrat care o depaseste pe cea a Londrei. La aproximativ 100 de kilmotrei distanta de Londra si 30 de Southampton, portul din Portsmouth dateaza de pe vremea romanilor si este incarcat de istori, fiind la inceputul secolului al XIX-lea cel mai fortificat oras din lume. iar centrul orașului păstrează multe clădiri ce datează din epoca victoriană.",
        "Desi atractia principala pentru vizitatori ramane marea si istoria navala, orarul este incărcat de istorie la tot pasul, un veritabil “muzeu în aer liber”, fiind împânzit de clădiri istorice (este si locul de nastere al lui Charles Dickens) și înconjurat de zidurile vechii cetati, acum transformate in muzee sau sali de spectacole."
      ],
      // 👇 NOU – doar pentru această tabără
      extraTitle: "",
      extraParagraphs: [
        ""
      ]
    },
    quickInfo: {
      location: "University of Portsmouth",
      duration: "8 zile / 7 nopți",
      ageGroup: "12 – 18 ani",
      dates: "30 iulie – 06 august 2023",
      price: "840 GBP"
    },
    highlights: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Materiale de studiu",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (una de jumătate de zi și una de o zi întreagă sâptâmânal)",
      "Un însoțitor de grup de la Pro Erudio pentru fiecare 15 copii"
    ],
    locationDescription: {
      title: "Școala",
      description: "Universitatea din Portsmouth în forma actuală datează din 1992, dar cea mai veche scoala din oras The Portsmouth Grammar School dateaza din anul 1732 si era, desigur, scoala de baieti. Astazi universitatea din Portsmouth numara peste 23.000 students si peste 2.500 de cadre didactice si personal auxiliar si este listata ca fiind printre cele mai bune 100 universitati din lume.",
      image: aboutPortsmouth2023,
      imageAlt: "Portsmouth"
    },
    locationFacilities: makeFacilities("liddington"),
    includedInPrice: [
      "Cazare în campus",
      "Pensiune completă",
      "15 lecții de engleză pe săptămâna în grupuri internaționale, cu profesori vorbitori nativi",
      "Test inițial de evaluare",
      "Certificate de absolvire a cursurilor",
      "Program zilnic de activități comune",
      "Program zilnic tematic",
      "Excursii (două de jumătate de zi și una de o zi întreagă)",
      "Un însoțitor de grup de la Pro Erudio la 10 copii",
      "Asigurare de călătorie"
    ],
    notIncludedInPrice: [
      "transport avion (aproximativ 350 euro, în funcție de oferta companiei de zbor la momentul rezervării locului)",
      "Transfer de la/ la aeroport în campus (se calculează în luna iunie în funcție de numărul participanților)",
      "Asigurare storno (optional)",
      "Cheltuieli personale"
    ],
    activitiesDescription: "Activitățile desfășurate în cadrul taberei sunt numeroase și foarte variate, oferind participanților o experiență educativă și recreativă completă. Programul include vizitarea orașului, cu activități de shopping și orientare, activități sportive în aer liber și în sala de sport multifuncțională, precum și o gamă diversificată de ateliere interactive, printre care se numără dans, actorie, fotbal, arts & crafts, cluburi de conversație, seminarii pe diferite teme, jocuri de echipă, precum și activități de jurnalism și media. Serile sunt dedicate activităților de socializare și divertisment, incluzând quiz-uri, vizionări de filme, prezentări de modă și seri tematice. De asemenea, programul cuprinde două excursii de o jumătate de zi, cu destinații precum Portsmouth sau Southampton, Catedrala din Chichester sau Castelul Southsea, precum și o excursie de o zi întreagă, cu posibilitate de vizitare a unor obiective importante precum Londra, Brighton sau Salisbury/Stonehenge, toate acestea contribuind la o experiență memorabilă și educativă pentru participanți.",
    activityImages: [activityPortsmouth1, activityPortsmouth2, activityPortsmouth3, activityPortsmouth4],
    discounts: [
      { type: "Continuitate", value: "5%", condition: "Completează dacă se aplică" },
      { type: "Frați", value: "5%", condition: "Completează dacă se aplică" }
    ],
    otherCamps: [
      {
        name: "Școală de vară de limba ENGLEZĂ la Dublin (DCU)",
        location: "Irlanda de Nord",
        type: "Internațională",
        image: heroDublinUniversity,
        to: "/scoala-de-vara-dublin-2026"
      },
      {
        name: "Tabara in Marea Britanie Grosvenor Hall Activity Centre",
        location: "Marea Britanie",
        type: "Internațională",
        image: heroGrosvenor,
        to: "/tabara-marea-britanie-grosvenor-hall-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Poiana Mărului",
        location: "România",
        type: "Aventură",
        image: heroPoianaMarului,
        to: "/tabara-poiana-marului-2026"
      },
      {
        name: "Tabără de limba engleză și aventură în România – Moinești",
        location: "România",
        type: "Aventură",
        image: heroMoinești,
        to: "/tabara-moinesti-2026"
      }
    ],
    sections: [
      {
        type: "richText",
        title: "Posibile destinații de excursii",
        paragraphs: [
          "Stonehenge & Salisbury",
          "Weymouth",
          "Bath",
          "Corfe Castle",
          "Dorchester",
          "Bournemouth"
        ]
      }
    ],
    programImage: { src: programUK, alt: "Program orientativ" },
    registrationInfo: DEFAULT_REGISTRATION,
    requiredDocuments: DEFAULT_REQUIRED_DOCS,
    form: {
      selectValue: "tabara-marea-britanie-grosvenor-hall-2026",
      selectLabel: "Școală de vară de limba engleză în Marea Britanie – Manchester 2025"
    }
  }
];
function getCampBySlug(slug) {
  if (!slug) return null;
  return campsData.find((c) => c.slug === slug) ?? null;
}
const CampPage = ({ slugOverride }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  useToast();
  const params = useParams();
  const slug = params.slug ?? slugOverride ?? "";
  const camp = useMemo(() => getCampBySlug(slug), [slug]);
  if (!camp) return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  const seo = getCampSEO(camp);
  const v = {
    showAbout: true,
    showFacilities: true,
    showProgramImage: true,
    showLuggageImage: true,
    showOtherCamps: true,
    showRegistrationForm: true,
    showRequiredDocs: true,
    showDiscounts: true,
    showActivitiesDescription: true,
    showActivities: true,
    showPriceDetails: true,
    showMenu: true,
    ...camp.visibility ?? {}
  };
  useState({
    selectedCamp: camp.form.selectValue,
    childName: "",
    childCity: "",
    childBirthDate: "",
    transport: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    source: "",
    gdprConsent: false,
    termsConsent: false
  });
  const renderItalicText2 = (text) => {
    const result = [];
    const regex = /\*(.*?)\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push(/* @__PURE__ */ jsx("span", { children: text.slice(lastIndex, match.index) }, lastIndex));
      }
      result.push(
        /* @__PURE__ */ jsx("em", { className: "italic", children: match[1] }, match.index)
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      result.push(/* @__PURE__ */ jsx("span", { children: text.slice(lastIndex) }, lastIndex));
    }
    return result;
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: seo.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: seo.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: seo.description }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: seo.image }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://tabere.proerudio.ro/${camp.slug}` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: seo.description }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: seo.image })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsxs("section", { className: "pt-16 h-[calc(100vh-4rem)] flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: camp.hero.image,
            alt: camp.hero.imageAlt,
            className: "w-full h-full object-cover",
            style: { objectPosition: camp.hero.objectPosition ?? "center" }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20px] left-0 right-0 p-6 lg:p-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold", children: camp.hero.badge }),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "\r\n                  mt-2\r\n                  font-bold\r\n                  text-foreground\r\n                  max-w-full\r\n                  break-words\r\n                  whitespace-normal\r\n                  xl:whitespace-nowrap\r\n                  lg:whitespace-nowrap\r\n                  text-[clamp(20px,5vw,40px)]\r\n                ",
              children: camp.hero.title
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-secondary/30 py-4 md:py-6", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Locație" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.quickInfo.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Durată" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.quickInfo.duration })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Vârstă" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.quickInfo.ageGroup })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Perioada" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground whitespace-pre-line", children: camp.quickInfo.dates })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(ReceiptPoundSterling, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Preț" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.quickInfo.price })
          ] })
        ] })
      ] }) }) })
    ] }),
    v.showAbout ? /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: camp.about.title }),
        camp.about.paragraphs.map((p, idx) => /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-muted-foreground leading-relaxed ${idx !== camp.about.paragraphs.length - 1 ? "mb-6" : ""}`,
            children: p
          },
          idx
        )),
        camp.about.extraTitle && camp.about.extraParagraphs && /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: camp.about.extraTitle }),
          camp.about.extraParagraphs.map((p, idx) => /* @__PURE__ */ jsx(
            "p",
            {
              className: `text-muted-foreground leading-relaxed ${idx !== camp.about.extraParagraphs.length - 1 ? "mb-6" : ""}`,
              children: p
            },
            idx
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-6", children: "Ce include tabăra" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          camp.highlights.map((highlight, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: highlight })
          ] }, index)),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-6 pt-6", children: "Ce nu include tabăra" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: camp.notIncludedInPrice.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5 text-destructive flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: item })
          ] }, index)) })
        ] })
      ] })
    ] }) }) }) : null,
    v.showFacilities ? /* @__PURE__ */ jsx("section", { className: "py-4 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Mountain, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Descrierea locației" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-4", children: camp.locationDescription.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed whitespace-pre-line", children: camp.locationDescription.description })
        ] }),
        ((_a = camp.locationDescription) == null ? void 0 : _a.image) ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: camp.locationDescription.image,
            alt: camp.locationDescription.imageAlt,
            className: "w-full h-[400px] object-cover"
          }
        ) }) : null
      ] }),
      ((_b = camp.locationFacilities) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-foreground mb-6", children: "Facilități" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: camp.locationFacilities.map((facility, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(facility.icon, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: facility.label })
        ] }, index)) })
      ] }) }) }) : null
    ] }) }) : null,
    v.showPriceDetails && /* @__PURE__ */ jsxs("section", { className: "pb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
        ((_c = camp.includedInPrice) == null ? void 0 : _c.length) > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-7 w-7 text-accent" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Ce include tariful" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: camp.includedInPrice.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-accent/10 rounded-lg", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: renderItalicText2(item) })
          ] }, index)) })
        ] }),
        ((_d = camp.notIncludedInPrice) == null ? void 0 : _d.length) > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-7 w-7 text-destructive" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Ce nu include tariful" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: camp.notIncludedInPrice.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-destructive/10 rounded-lg", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5 text-destructive flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: item })
          ] }, index)) }),
          /* @__PURE__ */ jsx(SectionGallery, { images: (_e = camp.galleries) == null ? void 0 : _e.notIncludedInPrice, className: "pt-10" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(SectionGallery, { images: (_f = camp.galleries) == null ? void 0 : _f.includedInPrice })
    ] }),
    v.showActivities && (camp.activitiesDescription || ((_g = camp.activityImages) == null ? void 0 : _g.length)) ? /* @__PURE__ */ jsx("section", { className: "py-4 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Compass, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Program de excursii și activități" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsx("div", { children: camp.activitiesDescription ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed whitespace-pre-line", children: camp.activitiesDescription }) : null }),
        ((_h = camp.activityImages) == null ? void 0 : _h.length) ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 rounded-2xl overflow-hidden shadow-lg", children: camp.activityImages.map((src, index) => /* @__PURE__ */ jsx("div", { className: "relative w-full aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src, alt: `Activitate ${index + 1}`, className: "w-full h-full object-cover" }) }, index)) }) : null
      ] })
    ] }) }) : null,
    ((_i = camp.sections) == null ? void 0 : _i.length) ? /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsx(CampSections, { sections: camp.sections }) }) }),
      /* @__PURE__ */ jsx(SectionGallery, { images: (_j = camp.galleries) == null ? void 0 : _j.other })
    ] }) : null,
    /* @__PURE__ */ jsx("section", { className: "py-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Clipboard, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Înscrieri și rezervări" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-4", children: "Pași pentru înscriere" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: camp.registrationInfo.steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm", children: index + 1 }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground pt-1", children: step })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-4", children: "Contact informații și înscrieri" }),
          /* @__PURE__ */ jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📞" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Telefon" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.registrationInfo.contact.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "✉️" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: camp.registrationInfo.contact.email })
              ] })
            ] })
          ] }) })
        ] })
      ] }) })
    ] }) }),
    v.showRequiredDocs && ((_k = camp.requiredDocuments) == null ? void 0 : _k.length) ? /* @__PURE__ */ jsx("section", { className: "py-6 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Documente necesare înscrierii" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: camp.requiredDocuments.map((doc, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: doc })
      ] }, index)) }) })
    ] }) }) : null,
    v.showDiscounts && ((_l = camp.discounts) == null ? void 0 : _l.length) ? /* @__PURE__ */ jsx("section", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Percent, { className: "h-8 w-8 text-accent" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Reduceri disponibile" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid justify-center grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-6 max-w-5xl mx-auto", children: camp.discounts.map((discount, index) => /* @__PURE__ */ jsx(Card, { className: "bg-card border-border text-center hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-accent", children: discount.value }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground mt-2 mb-2", children: discount.type }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: discount.condition })
      ] }) }, index)) })
    ] }) }) : null,
    v.showLuggageImage && ((_m = camp.luggageImage) == null ? void 0 : _m.src) ? /* @__PURE__ */ jsx("section", { className: "py-6 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Luggage, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-2", children: ((_n = camp.luggageImage) == null ? void 0 : _n.title) ?? "Ce trebuie să conțină bagajul copiilor" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx("img", { src: camp.luggageImage.src, alt: camp.luggageImage.alt, className: "w-full object-contain" }) }) })
    ] }) }) : null,
    v.showProgramImage && ((_o = camp.programImage) == null ? void 0 : _o.src) ? /* @__PURE__ */ jsx("section", { className: "py-6 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Program orientativ" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx("img", { src: camp.programImage.src, alt: camp.programImage.alt, className: "w-full object-contain" }) }) })
    ] }) }) : null,
    v.showMenu && ((_p = camp.menuImage) == null ? void 0 : _p.src) ? /* @__PURE__ */ jsx("section", { className: "py-6 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Book, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Meniu orientativ" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx("img", { src: camp.menuImage.src, alt: camp.menuImage.alt, className: "w-full object-contain" }) }) })
    ] }) }) : null,
    v.showOtherCamps && ((_q = camp.otherCamps) == null ? void 0 : _q.length) ? /* @__PURE__ */ jsx("section", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Building, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Alte tabere organizate de Pro Erudio" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `grid gap-6 max-w-6xl mx-auto
                ${camp.otherCamps.length === 3 ? "sm:grid-cols-3" : ""}
                ${camp.otherCamps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : ""}
              `,
          children: camp.otherCamps.map((c, idx) => /* @__PURE__ */ jsx(Link, { to: c.to, className: "block", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "h-40 overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: c.image ?? camp.hero.image,
                alt: c.name,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }
            ) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3", children: c.type }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors", children: c.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                c.location
              ] })
            ] })
          ] }) }, idx))
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ jsx("section", { className: "py-6 bg-primary", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-primary-foreground mb-4", children: "Formular de înscriere" }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary-foreground/80", children: [
          "Completează formularul pentru a rezerva un loc la ",
          camp.campName,
          " ",
          camp.year
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "bg-card border-0 shadow-2xl", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsx(RegistrationForm, { variant: "light" }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ziua11 = "/assets/Ziua1-1-CNFvRKMJ.jpg";
const ziua12 = "/assets/Ziua1-2-CCDzj6l3.jpg";
const ziua13 = "/assets/Ziua1-3-DGl-i8S_.jpg";
const ziua14 = "/assets/Ziua1-4-fsYksvag.jpg";
const ziua21 = "/assets/Ziua2-1-DFS_yWHO.jpg";
const ziua22 = "/assets/Ziua2-2-49KFJL7R.jpg";
const ziua23 = "/assets/Ziua2-3-BPXgGCWH.jpg";
const ziua24 = "/assets/Ziua2-4-B4dil3xB.jpg";
const ziua31 = "/assets/Ziua3-1-up8CAcjN.jpg";
const ziua32 = "/assets/Ziua3-2-Bl_LSe8G.jpg";
const ziua33 = "/assets/Ziua3-3-Cmlgx8Hi.jpg";
const ziua34 = "/assets/Ziua3-4-CtNoOty0.jpg";
const ziua41 = "/assets/Ziua4-1-B0tWGRDF.jpg";
const ziua42 = "/assets/Ziua4-2-CyuOrsHG.jpg";
const ziua43 = "/assets/Ziua4-3-1YPco1aq.jpg";
const ziua44 = "/assets/Ziua4-4-hLfRkN3Z.jpg";
const ziua51 = "/assets/Ziua5-1-WaFdRJrl.jpg";
const ziua52 = "/assets/Ziua5-2-Ds957xMI.jpg";
const ziua53 = "/assets/Ziua5-3-C5Exim-7.jpg";
const ziua54 = "/assets/Ziua5-4-D-1g3Stp.jpg";
const ziua61 = "/assets/Ziua6-1-DWFt8jEd.jpg";
const ziua62 = "/assets/Ziua6-2-CmWBMMPA.jpg";
const ziua63 = "/assets/Ziua6-3-CBfJx7tl.jpg";
const ziua64 = "/assets/Ziua6-4-sUzxnBr-.jpg";
const ziua71 = "/assets/Ziua7-1-CabAKeWx.jpg";
const ziua72 = "/assets/Ziua7-2-C-GRGoiw.jpg";
const ziua73 = "/assets/Ziua7-3-BrbK-Rv5.jpg";
const ziua74 = "/assets/Ziua7-4-DRsAvFDZ.jpg";
const ziua81 = "/assets/Ziua8-1-Blksn1Be.jpg";
const ziua82 = "/assets/Ziua8-2-DE0LmihK.jpg";
const ziua83 = "/assets/Ziua8-3-DAohPU3w.jpg";
const ziua84 = "/assets/Ziua8-4-C7vSlmTy.jpg";
const moinesti11 = "/assets/Moinesti11-D7vShEVV.jpg";
const moinesti12 = "/assets/Moinesti12-DxnNV3DE.jpg";
const moinesti13 = "/assets/Moinesti13-Dn26wpni.jpg";
const moinesti14 = "/assets/Moinesti14-NqXC9bIz.jpg";
const moinesti21 = "/assets/Moinesti8-DbIgeLTr.jpg";
const moinesti22 = "/assets/Moinesti22-BRGXmTW1.jpg";
const moinesti23 = "/assets/Moinesti23-CaMfwVyy.jpg";
const moinesti24 = "/assets/Moinesti24-CqtEMC4x.jpg";
const moinesti31 = "/assets/Moinesti31-jfHSoeO-.jpg";
const moinesti32 = "/assets/Moinesti32-kx0aLWav.jpg";
const moinesti33 = "/assets/Moinesti33-CJcE1_mR.jpg";
const moinesti34 = "/assets/Moinesti34-C6LK6PdY.jpg";
const moinesti41 = "/assets/Moinesti41-B7ZLSTa7.jpg";
const moinesti42 = "/assets/Moinesti42-B59Q-tS_.jpg";
const moinesti43 = "/assets/Moinesti43-XikCDtBa.jpg";
const moinesti44 = "/assets/Moinesti44-VJZ6f5Mx.jpg";
const moinesti51 = "/assets/Moinesti51-DpHp3Vt7.jpg";
const moinesti52 = "/assets/Moinesti52-D3cYIiWJ.jpg";
const moinesti53 = "/assets/Moinesti53-xydhrOeQ.jpg";
const moinesti54 = "/assets/Moinesti54-8D_DBdNn.jpg";
const moinesti61 = "/assets/Moinesti61-BV-jXVop.jpg";
const moinesti62 = "/assets/Moinesti62-DC4HQSzb.jpg";
const moinesti63 = "/assets/Moinesti63-CqAXieVL.jpg";
const moinesti64 = "/assets/Moinesti64-CtRgAQSv.jpg";
const predeal11 = "/assets/Predeal11-tUjgOnyo.jpg";
const predeal12 = "/assets/Predeal12-BZArNIBQ.jpg";
const predeal13 = "/assets/Predeal13-C_ITfK5C.jpg";
const predeal14 = "/assets/Predeal14-Hl3mGR_6.jpg";
const predeal21 = "/assets/Predeal21-CorrFjZ8.jpg";
const predeal22 = "/assets/Predeal22-F3D0aU7x.jpg";
const predeal23 = "/assets/Predeal23-DRRzJa29.jpg";
const predeal24 = "/assets/Predeal24-D0ePQ8fC.jpg";
const predeal31 = "/assets/Predeal31-BAi9Apfu.jpg";
const predeal32 = "/assets/Predeal32-C_8pdHgr.jpg";
const predeal33 = "/assets/Predeal33-CG00-MJ5.jpg";
const predeal34 = "/assets/Predeal34-urHGpdr1.jpg";
const predeal41 = "/assets/Predeal41-C8hpu0bF.jpg";
const predeal42 = "/assets/Predeal42-BXH7dBu7.jpg";
const predeal43 = "/assets/Predeal43-IVBaiOof.jpg";
const predeal44 = "/assets/Predeal44-ICrcwxTC.jpg";
const predeal51 = "/assets/Predeal51-BELDZVH2.jpg";
const predeal52 = "/assets/Predeal52-COCDJ7mx.jpg";
const predeal53 = "/assets/Predeal53-D1HwrJlp.jpg";
const predeal54 = "/assets/Predeal54-BqAu22yu.jpg";
const predeal61 = "/assets/Predeal61-Cu2PekH_.jpg";
const predeal62 = "/assets/Predeal62-FpnO-0G1.jpg";
const predeal63 = "/assets/Predeal63-DabLkMBi.jpg";
const predeal64 = "/assets/Predeal64-D71Xd-rA.jpg";
const journals = {
  "manchester-2025": {
    slug: "manchester-2025",
    navbarLabel: "JURNAL ȘCOALĂ INTERNAȚIONALĂ 2025",
    title: "Școală internațională de vară de limbă engleză în Marea Britanie",
    subtitle: "Jurnal de tabără",
    campus: "Universitatea din Salford (Manchester)",
    dates: "27 Iulie - 3 August 2025",
    heroImage: ziua51,
    heroAlt: "Manchester 2025",
    quickInfo: {
      location: "Manchester, Marea Britanie",
      duration: "7 zile / 6 nopți",
      ageGroup: "8-16 ani"
    },
    entries: [
      {
        day: "Ziua 1",
        content: `Prima zi de tabără a început extrem de devreme întrucât avionul era la ora 7.00. Cu emoții și somnoroși sau nu 😊, ne-am întâlnit cu totii, părinți și copii, la ora 4.30 la Aeroportul Otopeni, zona Plecări. Totul a decurs conform planurilor, nimeni nu a întârziat sau a avut dificulțăți la îmbarcare, scurta escală de la Amsterdam a fost fix cât să schimbăm avioanele în mare grabă, așa că la 10.20, ora Marii Britanii, am aterizat pe aeroportul din Manchester, destinația călătoriei noastre. De acolo am fost preluați cu autocarul pentru transferul spre Universitatea din Salford, iar în jurul orei 13.30 am sosit în campus. 

După o primire foarte călduroasă (am mâncat pizza cu mare poftă că ne era și foame, YUM!) ne-am primit cheile de la camere, deci până acum totul la superlativ, prea bine să fie adevărat 😊. Partea neplăcută a fost că încă se făcea curățenie în cameră și, deși inițial ni s-a spus că putem să mergem să ne odihnim fiecare în patul lui la ora 15.30, așteptarea a fost mai lunga decât ne gândeam...Nu a fost o problemă foarte mare întrucât ni s-a pus la dispoziție o zonă în care să ne realxăm, iar cei mai curioși dintre noi au plecat puțin în recunoastere prin campus. Campusul este superb, cu clădiri tipic englezești, o alternanță modern (cu sticlă și forme neregulate) și tradițional (acoperite cu cărămidă roșie), cu foarte multe spații verzi și flori, o împletire armonioasă între natură și eleganță arhitecturală. Și camerele sunt spectaculos de frumoase, ca niste camere de hotel (fiecare cameră cu baie proprie), dar cu spații comune pe fiecare apartament, spațiu care deja presimțim că va fi folosit ca zonă de socializare în timpul liber. 

Cina a fost acceptabilă, după standarde englezești, dar suficient de bună si variată ca să ne dea energie pentru o plimbare după masă. Oricum, oboseala drumului, schimbarea de fus orar și somnul scurt din noaptea anterioară ne-a făcut să căutăm să ne retragem în camerele noastre mai devreme decât în serile ce vor urma. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1329458625298166&type=3",
        images: [ziua21, ziua22, ziua23, ziua24]
      },
      {
        day: "Ziua 2",
        content: `A doua zi a început tot devreme, dar de data aceasta dimineața ne-a găsit odihniți și nerăbdători să descoperim mai mult din ceea ce are să ne ofere programul de tabără. La ora 8.00 ne-am întâlnit cu toții în fața clădirilor de cazare (există acolo o zonă special dedicată, cu băncuțe și arbuști) pentru a merge la cantină. Distanța dintre cazare și cantină era de aproximativ un sfert de oră, dar clădirea în care se țineau cursurile era chiar lângă cantină, deci trebuia sa avem grija în fiecare dimineață să ne luam din cameră tot ce aveam nevoie, organizarea face mereu diferența. 

La ora 9.00 au început cursurile de limbă engleză, iar în prima parte copiii au primit un test (inclusiv o probă orală), la care s-au descurcat remarcabil, motiv pentru care au fost plasați în grupe mai mult ai noștri cu ai noștri întrucât nivelul lor de limbă engleză este mult peste media de cunoștințe ale celorlalte nationalități. Motiv de bucurie, dar și de tristețe întrucât unul dintre obiectivele taberei este să socializeze în grupuri internaționale. Sigur vom mai avea ocazii... 

Prima activitate de după-amiază a fost prezentarea programului, a echipei, a regulilor taberei etc și o scurtă plimbare prin campus pentru a ne arăta distanțele cele mai scurte dintre punctele de interes. Campusul este enorm și activitațile pot fi programate în diferite zone, deci această orientare a fost foarte binevenită. 

A doua activitate de după-amiază a fost un Scavenger Hunt pentru a ne consolida informațiile primite la atelierul anterior despre unde se află diferite clădiri și a ne ajuta să ne cunoaștem mai bine. S-au format echipe internaționale, deci a trebuit să colaborăm și cu copii din alte țări pentru îndeplinirea sarcinilor de lucru. 

Activitatea de seară a fost un deliciu culinar sub îndrumarea haioasei Sabrina. Am făcut cupcakes 😊. Cu unt, cu creme de mai multe feluri, decorate, pufoase și înmiresmate cu fel de fel de esențe, pe scurt delicioase. Iar când le pregătești alături de prieteni și cu propriile mâini, clar le vei savura. Unde pui că primești ca bonus și rețeta, pe care o poți reinterpreta acasă pe gustul tău 😊. 

Mergem la culcare epuizați, dar fericiți. Ne întrebăm ce aventuri ne așteaptă ziua următoare… `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1329896498587712&type=3",
        images: [ziua11, ziua12, ziua13, ziua14]
      },
      {
        day: "Ziua 3",
        content: `În a treia zi de tabără am fost foarte activi încă de dimineață. După micul dejun ne-am împărțit în două grupuri, în funcție de preferințe. O echipă a mers însoțită de Reyhan la un parc de trambuline absolut formidabil, unde am țopăit, rostogolit, întrecut în sărituri și tumbe în aer sau luat la trântă cu niște ciocane uriașe pe bârne… sau luat la țintă cu mingi mici de plastic, în care puteai să și înoti sau să te scufunzi… În fine, fiecare a găsit ceva de făcut pe gustul lui acolo, inclusiv să își completeze micul dejun cu un sendviș uriaș sau o înghețata în asteptarea prânzului. Cea de-a doua grupă a mers la Laser Quest, unde s-au împușcat după pofta inimii. Bonusul a fost că aceasta activitate s-a desfășurat într-un mall imens, iar cei dornici de shopping au putut să petreacă ceva timp și prin magazine. Desigur că timpul a fost insuficient, dar ne-am propus să revenim. 

Imediat după prânz (a fost coadă mare la cantină de data aceasta și nu am mai avut timp să mergem în camere, așa că ne-am propus să identificam orele cu mai puțină aglomerație ca să scurtăm timpul de așteptare) am mers la orele de limba engleza în fabuloasa cladire în stil Victorian. Au fost doua sesiuni de curs, cu jumătate de oră pauză între ele, dar mulți nu au mai ajuns în camere, au preferat să  socializeze în Parcul Peel, zona perfectă pentru relaxare. Orele de engleză au fost interactive, bazate pe discuții, proiecte, cu activități în perechi și echipe, așa cum noi suntem deja obșinuiti să lucrăm.  

Activitatea de seara a fost distractivă și diversă. Am avut de ales între piscină și jocuri de masă la interior sau atelier de dans. Ne-am împărțit fiecare pe unde a vrut, dar se pare că cei care au ales jocurile de masă au tras lozul câștigător. S-a jucat sah, Monopoly, Jenga, jocuri de cărți, s-a pictat pe pietre și s-a modelat cu argilă. Desigur, unii au făcut de toate, mutându-se de la stație la stație, inclusiv de la dans la șah :). A fost super distracție, mai ales ca aveam posibilitatea să alegem muzica… `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1330787151831980&type=3",
        images: [ziua31, ziua32, ziua33, ziua34]
      },
      {
        day: "Ziua 4",
        content: `În a patra zi de tabără deja avem rutina stabilită: ne întâlnim la cazare, mergem la masă, apoi la activitatea de dimineață, prânz, cursuri, activitatea de seara și ziua este gata… În dimineata aceasta luăm autobuzul spre Manchester. Un double-decker aproape gol (nu pentru mult timp că doar noi suntem 45…), așa că mergem la etaj, să avem priveliște. După aprximativ o jumătate de oră ajungem la Muzeul Stiinței și Industriilor unde aflăm despre dezvoltarea orașului industrial Manchester. Aflăm despre modul de viață în Epoca Industrială, despre comerțul cu lână și industria bumbacului, despre prima moară de bumbac care datează din 1780, despre prima șină de cale ferată care leagă Manchestrul de Liverpool în 1830 pentru a înlesni transportul între cele două orașe etc. Aflăm cu stupoare că în a doua jumătate a secolului al XVIII-lea doar jumătate dintre copii atingeau vârsta de doi ani, iar la cinci ani ajungeau doar 104 din 1000. Procente copleșitoare, informații care te tulbură, mașinării de tot felul, o dimineată plină. 

În rest, programul zilnic își urmează cursul obișnuit, iar seara avem din nou de ales între atelierul de jocuri, cel de vopsit tricouri și cel de baking. Ca și data trecută, unii au reușit să participe la mai multe și să lege noi prietenii în timp ce se distrează. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1332021865041842&type=3",
        images: [ziua41, ziua42, ziua43, ziua44]
      },
      {
        day: "Ziua 5",
        content: `Am depășit deja jumătatea timpului pe care îl avem de petrecut la Manchester și nu știm când a trecut...  

În a cincea zi de tabără am mers la Galeria de Artă Whitworth din Manchester. Această galerie, pe langă obișnuitele exponate, are și o parte interactivă, în sensul că am putut să ne punem la încercare talentul artistic cu pensula pe pânză... A fost foarte simpatic, iar unii dintre noi chiar au reușit să contureze ceva cu sens... Ca la orice punct de atracție în Marea Britanie, și aici am găsit o cafenea cu prăjituri spectaculoase. Pe scurt, la această vizită fiecare a găsit ceva de făcut, văzut sau gustat. 

După prânz și cursurile de engleză, am avut o serie de activități în Parcul Peel. Am jucat volei, fotbal, badminton, am sărit coarda sau pur și simplu ne-am distrat la terenul de joacă. Organizatorii au avut și pături, deci cine a dorit a putut și să joace cărți sau se relaxeze pe iarbă cu telefonul în mână ori de vorbă cu prietenii. 

Seara ar fi trebuit să se încheie cu un moment disco, dar au fost ceva probleme tehnice care s-au remediat destul de târziu, când majoritatea copiilor deja se retrăseseră spre camere. Am obținut, totuși, promisiunea că a doua zi să se țină din nou discoteca, speram să nu mai existe probleme.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1332985374945491&type=3",
        images: [ziua51, ziua52, ziua53, ziua54]
      },
      {
        day: "Ziua 6",
        content: `A sosit și mult așteptata zi în care să facem turul ghidat al Stadionului Etihad, faimosul stadion al echipei Manchester City. A fost absolut grandios. Nu doar că am avut acces la stadionul propriu-zis și am putut să facem poze cu gazonul, lojele, am trecut prin tunelul prin care jucătorii intră pe teren, dar am văzut vestiarele, am atins tricourile celor mai faimoși fotbaliști ai lumii, am stat pe bancile pe care se așează și fotbaliștii clubului. Dar punctul de mare atracție al vizitei a fost sala în care se fac conferințele de presă întrucât am putut să facem poze la masă cu Joseph (Pep) Guardiola în persoană. Amintiri unice, emoții de neuitat… Desigur, plecarea a durat mai mult decât am anticipat fiindcă ultima oprire a fost la magazine, de unde fiecare a vrut să plece cu o amintire, mai mult sau mai puțin costisitoare. 

Așa cum ni se promisese, seara am avut disco. Aranjați care mai de care (în special fetele), am dansat și cântat melodii alese de noi sau alții, a fost foarte frumos!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1334672534776775&type=3",
        images: [ziua61, ziua62, ziua63, ziua64]
      },
      {
        day: "Ziua 7",
        content: `În ultima zi de tabără am mers în excursia de o zi la Chester, unul dintre cele mai frumoase orășele din Marea Britanie. Am aflat despre istoria asezării care datează de pe vremea romanilor, când s-a constituit ca o fortăreață militară (79BC) cu numele Deva Victrix. După retragerea romană orașul a fost ocupat de anglo-saxoni, cei care au fortificat pereții cetății pentru a se apăra de raidurile vikingilor. Mai tarziu, cucerirea Normandă a adus orașul sub conducerea ducelui de Chester (de unde și numele), după care localitatea a devenit un port important, pus în umbră de Liverpool abia în secolul al XVIII-lea. Orașul cunoaște un nou moment de dezvoltare în perioada victoriană, din această perioadă datând foarte multe clădiri, care îi și conferă o culoare aparte.  

Vizita noastră a început cu un tur pietonal în centrul Chester-ului, a continuat cu vizitarea faimoasei și grandioasei catedrale, după care am mers la un tur ghidat cu vaporul, când am văzut majoritatea clădirilor emblematice pentru oraș. După ce am vizitat și un edificiu roman, am început lunga plimbare pe cei trei kilometri de ziduri de apărare care încercuiesc orașul. Minunate priveliști pe cel mai bine păstrat și cel mai lung zid de apărare din Marea Britanie. 

Obosiți, dar fericiți, am ajuns în campus chiar la timp pentru o cină mai târzie decât de obicei (cina era în general la ora 18.00). Activitatea de seară a fost opțională, dar toți au ales să aparticipe la jocuri în Peel Parc, doar este ultima seară petrecută în această tabără și trebuie să profităm la maxim de fiecare moment. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1335540731356622&type=3",
        images: [ziua71, ziua72, ziua73, ziua74]
      },
      {
        day: "Ziua 8 - ultima zi de tabără",
        content: `Ultima zi de tabără a fost tristă fiindcă trebuia să ne despărțim de prieteni dragi. După ce am făcut poze în fel și chip cu certificatele primite la curs (am avut și mândria ca două dintre elevele noastre să fie desemnate Student of the Week pentru implicare din timpul cursurilor și cunoștințele de limbă engleză), am vrut neapărat să ne luam la revedere de la toti activity leaders englezi. Fiindcă unii au fost greu de găsit, chiar am întârziat puțin plecarea, noroc că domnul șofer a fost super înțelegător. 

A urmat lunga călătorie înapoi spre casă, cu escală la Amsterdam și mult timp liber la Duty Free, moment tocmai bun să mai cumpărăm câte ceva celor dragi.  `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1336400084604020&type=3",
        images: [ziua81, ziua82, ziua83, ziua84]
      }
    ]
  },
  // Exemplu pentru al doilea jurnal (completezi tu ulterior)
  "moinesti-2025": {
    slug: "moinesti-2025",
    navbarLabel: "JURNAL ENGLISH EXPLORERS CAMP 2025",
    title: "Tabără de limba engleză și aventură în România",
    subtitle: "Jurnal de tabără",
    campus: "Moinești, România",
    dates: "29 iunie – 4 iulie 2025",
    heroImage: moinesti43,
    heroAlt: "Moinești 2024",
    quickInfo: {
      location: "Moinești, România",
      duration: "—",
      ageGroup: "—"
    },
    entries: [
      {
        day: "Ziua 1",
        content: `La ora 8.00 am pornit din Piata Constitutie catre Moinesti cu entuziasm, asa cum ne sta bine la inceput de tabara :). La ora 11.30 am facut un scurt popas de mancat sandvisuri si intins picioarele, drumul este lung, dar noi rezistam eroic. In autocar facem o multime de jocuri (cultura generala, atentie, rapiditate in gandire etc) ca sa treaca mai repede timpul si sa castigam deja puncte pentru viitoarele echipe. 

Odată ajunși la cazare, in jurul orei 14.00, am luat prânzul. Am avut de ales dintre 3 feluri de ciorbe/supe, 4 preparate din carne (pulpe dezosate in sos la tava, ceafa/piept de pui la gratar si chiftelute de pui), alaturi de diferite garnituri (cartofi piure, prajiti sau la cuptor, paste in sos de smantana si mamaliguta) si salate (de rosii, de varza sau castraveti de vara murati). Am avut si desert o prajitura cu blat de nuca de cocos si crema de ciocolata. Apa minerala si plata la discretie pe mese. Adica destule variante pentru toate gusturile. Si toate gustoase! 

Dupa mai putin de o ora de relaxare in camere, ne-am intalnit in fata salii de conferinte Antonia pentru prima serie de activitati. Am inceput cu 2 jocuri de cunoastere si am continuat cu formarea echipelor si activitati in echipe. A urmat prezentarea blazoanelor si a rolurilor fiecarui co-echipier intrucat in tabara de anul acesta fiecare echipa reprezinta un regat. Inainte de cina am aflat si regulile taberei, ca sa evitam orice neintelegere... 

Cina a fost la fel de varianta si gustoasa ca si pranzul. Am avut snitele, diferite feluri de carne la cuptor, carnati, diferite de tipuri de cartofi, paste, orez, salate si desert. Am mancat pe saturate ca sa avem energie si pentru activitatile de seara. 

Atelierul de seara a fost un TASK RACE care a avut, printre alte sarcini de lucru, si crearea unei coroane reprezentative pentru regatul fiecarei echipe. Intre timp am ramas fara baterie, deci vom completa albumul si cu creatiile celorlalte echipe, dar cu pozele facute cu telefoanele copiilor 🙂. Lucru in echipa cu adevarat! Multumim, copii! 

Seara s-a incheiat cu impartirea stickerelor, ca de obicei. La ora 23.00 era liniste in toate camerele, toata lumea dormea bustean. `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1304164541160908&amp;type=3",
        images: [moinesti11, moinesti12, moinesti13, moinesti14]
      },
      {
        day: "Ziua 2",
        content: `A doua zi a început foarte devreme. La ora 7.00 deja era forfotă pe coridoare, deci încalzirea pe ritm de dans a fost exact ceea ce ne trebuia înainte de micul dejun copios și divers, așa cum ne-am obișnuit deja să fie mesele aici. 

Cursurile de limbă engleză au fost împărtițe în două sesiuni cu un sfert de oră pauză între ele. La cursurile de dimineață nu se ține cont de echipe, ci de vârste și nivelul de cunoștințe de limbă engleză, deci avem ocazia să cunoaștem mai bine și alți copii. La cursuri am discutat despre impartanța știintei în viețile oamenilor și am făcut fel de fel de activități interactive plecând de la această temă pentru a ne perfecționa exprimarea în limba engleză și lărgi vocabularul tematic. A fost foarte interesant și totodată instructiv! 

Atelierele de după-amiază au fost super simpatice. La primul, copiii au confecționat prototipul unei invenții care să le facă viața mai ușoară și apoi să îi facă o reclamă ca să îi convingă pe prietenii lor să o cumpere. Am avut de toate: cutii în care introduci tema și o scoți gata efectuata, brățări care îi țin departe pe copiii neprietenoși, dulapuri în care intri în haine obișnuite și ieși îmbrăcat cum îți dorești, poțiuni care îți asortează îmbrăcămintea, imprimante de haine și chiar niște dispozitive de apucat lucrurile de la distanță cu efort minim. Toate inspirate și foarte frumos explicate! Bravo, copii! 

La al doilea atelier i-am provocat pe copii cu proiectarea unei vacanțe pentru o familie cu doi copii. Elementul surpriză a fost ca fiecare echipă a avut o suma diferită la dispoziție. Obiectivul acestei activități a fost să bugeteze o vacanță întrucât educația financiară este bine să înceapă la o vârstă mică, pentru copii este important să știe valoarea banilor. Întrucât știm că nu ei stabilesc destinații, activități, transport și mese în vacanță, le-am dat voie să folosească internetul pentru a afla prețuri realiste.  

Este adevărat că nu este ușor să pleci în vacanta 5 zile cu un buget de 300 euro și că este greu să cheltuiești 5000 euro într-o vacanță la Costinești, dar echipele noastre au reușit. Acum știm că 70 euro este prea puțin pentru benzină până în Grecia și că un bilet la tren până la Mamaia costă mai mult de 5 euro 😅. Cât despre cazări și cheltuiala pentru o masă, prețurile pot varia atât de mult, încât poți găsi soluții pentru diferite bugete. Ceea ce este minunat, dar trebuie sa alegi cu înțelepciune 🥰. Excellent work, teams! 🫶 

Între activitatile de după-amiază și cină am avut ceva timp liber, așa că cei mici s-au dat pe tiroliană câte ture au vrut ei, iar cei mari au jucat ping-pong sau au socializat de voie.  

Activitatea de seară a venit cu provocări pe echipe. Am avut curse cu ștafetă, activități de coordonare (echipa mută paharul cu apă pus pe parașută), dexteritate (lovituri la țintă, aruncă cercul pe trompa elefantului), toate activitățile vizând creșterea unității echipei și credem că au fost un succes. Bravo, echipe! 🥰 `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1305826244328071&type=3",
        images: [moinesti21, moinesti22, moinesti23, moinesti24]
      },
      {
        day: "Ziua 3",
        content: `În cea de-a treia zi am început, ca de obicei :), cu încălzirea (exerciții de înviorare urmate de exerciții mai dinamice și, bineînțeles, de dansurile preferate). După încălzire, copiii au mers în echipe la micul dejun și apoi la cursurile de limbă engleză la care au discutat despre istorie, tema zilei fiind "Explore the Past!". Am discutat despre pirați faimoși și mituri legate de aceștia, evenimente misterioase din trecut, exploratori cunoscuți sau animale preistorice.  

După prânz, am plecat cu autocarul să vizităm orașul Bacău, unde am văzut Casa Memorială "George Bacovia", locul unde acesta a compus aproape toata opera care l-a consacrat. Copiii au descoperit istoria familiei poetului cu ajutorul doamnei ghid, care le-a povestit într-un mod captivant anecdote din viața lui și chiar ne-a pus o înregistrare cu vocea poetului recitând "Amurg violet".  

Înainte de a pleca înapoi spre hotel, am poposit pe Insula de agrement de pe Râul Bistrița, o alta mândrie locală, si ne-am răcorit cu înghețată sau suc, după preferințe. A urmat cina și activitatea de seară "Team Feuds", o adaptare a celebrului show "Ce spun românii?". Echipele noastre s-au duelat amical în cuvinte și idei, desigur că în limba engleză, deci toată lumea a ieșit câștigătoare :). Bravo, echipe! 💪 `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1306676177576411&type=3",
        images: [moinesti31, moinesti32, moinesti33, moinesti34]
      },
      {
        day: "Ziua 4",
        content: `În cea de-a patra zi de tabără am explorat artele. La grupele de limbă engleză cu elevi mari și nivel bun de cunoaștere a limbii engleze am tradus poezii de George Bacovia in grupuri de 3 copii, desigur fiind inspirați de vizita din ziua anterioară. La cei mai micuți am discutat despre artele vizuale, despre muzica și dans, teatru și cinematografie, după cum ne-au ghidat doamnele profesoare. Desigur că ne-am demonstrat abilitățile practice în activități în perechi și grupuri mici, așa cum ne stă bine să facem în tabără. 

După prânz am făcut o scurtă excursie întrucât este păcat să ajungi într-un loc nou și să nu vezi ce îți oferă zona. Astfel, am vizitat două obictive emblematice pentru zona (supranumită și Valea Loarei de România), primul fiind Castelul Ghika de la Dofteana, care a fost construit la 1894 cu rol de casă de vânătoare, iar în timpul comunismului a fost utilizat ca spital de boli pulmonare, și ulterior orfelinat și internat pentru copii. Al doilea obiectiv a fost Palatul Ghika de la Comănești, construit în anul 1890, în stilul baroc târziu şi eclectic, de ,,meşteri italieni’’ la comanda proprietarului moşiei, Dimitrie Ghika. Parcul si palatul au fost resedinta familiei pana in 1946, dupa care a primit numeroase destinatii care au dus la degradarea acestuia. Acum în palat functioneaza Muzeul de Etnografie si Arta.  

La întoarcerea din excursie, cine a mai avut energie înainte de cină a făcut o baie grozavă în piscina interioară sau a petrecut timp de calitate cu prieteni dragi la locul de joacă.  

Activitatea de seară a fost foarte creativa. În echipe a trebuit să confecționăm un pom din hărtie rulată și să prezențăm povestea copacului, desigur ținând cont de mai multe elemente cheie. A fost foarte simpatic, dar deloc simplu de realizat. Provocare acceptata, reușită sigură. Bravo, copii! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1307487994161896&type=3",
        images: [moinesti41, moinesti42, moinesti43, moinesti44]
      },
      {
        day: "Ziua 5",
        content: `Penultima zi de tabără a fost fabuloasă întrucât a fost dedicată sporturilor. La cursurile de dimineață am discutat despre sport și beneficiile lui și chiar am inventat un sport sau luat parte la diferite probe sportive, în funcție de vârstă și interesul participanților.  

Dupa-amiaza a fost efervescentă întrucât am petrecut-o la piscina exterioară, unde am avut parte și de petrecere cu muzică și multă, multă spumă. Ca sa nu mai povestim că am primit și înghețată sau sucuri din partea casei, ca să fie petrecerea petrecere adevărată. 

Seara a fost și ea grandioasă. După spectacolul de talente (și ce copii talentași am avut!!!) a urmat focul de tabără cu muzică și popcorn, apoi dans și scris mesaje pe șepci, în hohote de râs și plâns întrucât știm că este ultima seara împreună… Cel puțin ultima din acest an școlar întrucât sigur vom reveni aici și vara viitoare! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1312885916955437&type=3  ",
        images: [moinesti51, moinesti52, moinesti53, moinesti54]
      },
      {
        day: "Ziua 6",
        content: `Ultima zi de tabăra a început tot cu mișcare, ca să avem energie toată ziua . După micul dejun a urmat ultima serie de puncte pentru echipe pentru a putea face clasamentul. Știm de acum, toate echipele au ieșit căștigătoare dacă pleacă din tabără îmbogățiți la minte și suflet, cu noi abilități învățate, mai responsabili și cu un bagaj mare de jocuri pe care să le incerce și cu prietenii  de acasă. 

A urmat festivitatea de înmânare a certificatelor și tradiționala poză de grup, ca să avem dovada că au fost în tabără. Ce frumos a fost totul… 

Cu tristețe că s-a terminat, dar bucuria că va urma și o data viitoare, ne ducem bagajele la autocar și ne îmbarcăm pentru drumul lung de întoarcere acasă. Pe drum, cu acordul părinților, oprim pentru o masa mult râvnită la KFC ca să ne consumăm și ultimii banuți de buzunar, pe care i-am păstrat cu grijă întrucât în tabără oricum nu am avut pe ce sa ii cheltuim. In jurul orei 18.00 am ajuns din nou în Piața Constitutiei, de unde ne-au preluat dragii noștri părinți. Bravo, echipe! Pe vara viitoare! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1315176926726336&type=3",
        images: [moinesti61, moinesti62, moinesti63, moinesti64]
      }
    ]
  },
  "predeal-2024": {
    slug: "predeal-2024",
    navbarLabel: "English Explorers Camp – Predeal 2024",
    title: "Tabără de limba engleză și aventură în România",
    subtitle: "Jurnal de tabără",
    campus: "Predeal, România",
    dates: "30 iunie – 05 iulie 2024",
    heroImage: predeal13,
    heroAlt: "Predeal 2024",
    quickInfo: {
      location: "Predeal, România",
      duration: "—",
      ageGroup: "—"
    },
    entries: [
      {
        day: "Ziua 1",
        content: `Prima zi de tabără a început devreme. La ora 8.00 eram deja în Piața Constitutiei, pregătiți să ne
îmbarcăm în autocar și să începem aventura!
Ne-am oprit mai întâi la Conacul Bellu din Urlați, pe care l-am vizitat împărțiți în două grupe întrucât
eram prea mulți pentru camerele micuțe. Unii au vizitat foișorul, iar ceilalți conacul propriu-zis. Am
văzut o expoziție de obiecte din epoca eneolotică, precum și obiecte din colecția personală a lui
Alexandru Bellu. Tot aici am mâncat și prânzul împachetat de acasă. Am vizitat crama, unde am văzut
instrumentele de preparare a vinului, dar și butoaiele de depozitare. După plecare, în autocar, am
răspuns la tot felul de întrebări, demonstrând că am fost atenți. Desigur că a contat și faptul că vom
primi puncte pentru echipele viitoare :).
Următoarea oprire a fost la Casa memorială George Enescu. Am aflat detalii despre viața faimosului
compozitor, despre importanța activității sale pentru familia regală, am putut observa cum trăia
maestrul alături de soția sa, am văzut prima vioară a acestuia, primită la doar 4 ani și am audiat un
fragment din Prima Rapsodie Română într-un spațiu special amenajat pentru evenimente din fostul
garaj al familiei Enescu.
Am ajuns la cazare în jurul orei 14.30, încântați, dar flămânzi. Am înfulecat o supă de pui cu tăieței,
apoi cărniță de porc la tava, cu orez și salata de varza, urmate de o porție de fructe (pepene rosu si
caise). Ne-am instalat în camere, ne-am odihnit puțin, apoi ne-am strâns pe teren pentru activitățile
introductive. Am aflat mai multe despre ceilalți copii, am fost împărțiți în echipe și ni s-au testat
cunoștințele despre coechipieri/atenția.
Următoarea activitate a fost prezentarea regulilor taberei și am avut ocazia să punem întrebări
pentru a ne asigura că toate informațiile ajung la fiecare exact cum trebuie. Cina a fost bine venită la
ora 19.30, când ne-am bucurat de un șnițel de pui cu piure și o porție de clătite cu înghețată. Seara
am fost provocați atât fizic, cât și mental pentru a câștiga puncte pentru echipele noastre. Am sărit
peste obstacole, am participat în curse de mai multe feluri, ne-am întrecut în rezistență, ne-am testat
memoria, puterea fizică și dexteritate. Înainte de culcare, eforturile ne-au fost răsplătite cu stickere.
La ora 23.00 toată lumea era în pat, mulți copii deja în tărâmul viselor.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1027486752162023&amp;type=3",
        images: [predeal11, predeal12, predeal13, predeal14]
      },
      {
        day: "Ziua 2",
        content: `După un somn bine meritat, ne-am trezit înainte de ora programată, nerăbdători să ieșim afară la aer
curat. Am început ziua cu un moment de încălzire și înviorare. Alexandra ne-a îndrumat să executăm
mai multe exerciții și două dansuri, astfel încât la ora 9.00, la micul dejun, eram cu toții flămânzi. Am
avut de ales între tot felul de legume proaspete, salată de vinete, zacuscă, cremă de brânză, brânză și
cașcaval, mezeluri și crenvurști, omletă și ouă fierte, unt, gem, cereale de două feluri, iaurt ceai și alte
bunătăți.

A doua zi de tabără a fost ”Explore Imagination” și la cursurile de engleză inventat povești,
reinterpretând opere de artă și creând propriile noastre lucrări artistice. La prânz am mâncat ciorbă
de văcuță, apoi cărniță de pui în sos roșu cu mămăligă și salată. Yummy!
După-amiază am fost împărțiți în trei grupuri, în funcție de vârstă, pentru a ne bălăci în piscină. Am
avut mingiuțe și batoane din spumă, am înotat, ne-am întrecut la meciuri de polo, ba chiar unii dintre
noi am învățat tehnici noi. Între timp, cei care își așteptau rândul la piscină au participat la ateliere
artistice de tot felul, dar toate din aria artistică desen, creare de jocuri sau benzi desenate,
confecționare rame sau creare de benzi desenate. La gustarea de după-amiază am primit nectarine,
pe care le-am devorat instantaneu.
Pentru activitatea de seară am fost provocați să rămânem pe tărâmul imaginației și să ne folosim de
întreaga echipă, de la mic la mare, pentru a găsi sau a confecționa tot felul de obiecte magice,
precum ochelarii rupți ai lui Harry Potter, aripa unei zâne sau ochiul unui căpcăun. A trebuit să
inventăm povești despre cum am intrat în posesia acestor obiecte și să convingem juriul că sunt cât
se poate de reale. Incredibil, toate echipele au fost triumfătoare și au adus toate cele zece obiecte
cerute. Adevărul este ca nu strică să ai la îndemână o sabie cu laser sau un ou de dragon... Mai mult,
poveștile noastre au fost atât de elaborate încât nici nu am mai avut timp de ceremonia sticker-elor,
rămânând să le primim a doua zi de dimineață.
Ne-am retras în camere puțin după ora 22.00 și până la 23.00 dormeam adânc, probabil visând la
personajele fantastice si animalele mitologice care ne-au animat seara.`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1028111892099509&amp;type=3",
        images: [predeal21, predeal22, predeal23, predeal24]
      },
      {
        day: "Ziua 3",
        content: `După rutina de dimineață (încălzire și mic dejun), la cursurile de limbă engleză am discutat despre
științe, tematica zilei fiind Explore Science. Cu cei mai mici am făcut experiențe pentru a observa
transformările din natură cu ochii noștri, iar la grupele mai mari am discutat despre ultimele
descoperiri, am inventat dispozitive care să ajute viața omului și am încercat să ghicim ce ne va aduce
viitorul.
La primul atelier de după-amiază, echipele au fost provocate să își folosească imaginația și
cunoștințele pentru a proiecta un pod folosind un număr limitat de materiale reciclabile și orice
elemente care puteau fi culese din natură fără a o răni. Puteți admira în imaginile alăturate proiectele
copiilor. Toate minunate!
La al doilea atelier, echipelor li s-a prezentat un scenariu apocaliptic în care omenirea trebuia să
găsească o altă planetă locuibilă. Micii noștri cercetători trebuie să descrie condițiile de viață de
acolo și să explice cât de ușor i-ar fi omenirii să populeze respectiva planetă! Excellent work, teams!
Ziua a treia de tabără a fost una specială întrucât prima repriză din meciul România-Olanda s-a
desfășurat în timpul cinei și am observat cât de mulți microbiști avem printre noi. După cină, nu am
avut altă opțiune decât să continuăm vizionarea meciului în sala de conferință. Dezamăgirea a fost
mare la finalul celei de a doua repriză, dar ne-am revenit repede la trei runde de întrebări despre
științe. Felicitări tuturor echipelor!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1029430115301020&amp;type=3",
        images: [predeal31, predeal32, predeal33, predeal34]
      },
      {
        day: "Ziua 4",
        content: `Cea de-a patra zi de tabără a fost foarte ploioasă. A plouat torențial dimineața, așa că încălzirea s-a
făcut în premieră în sala de conferințe. Nu a fost ideal, dar, cu putina creativitate, orice este posibil.
A plouat si in timpul atelierelor de limba engleza de dimineata. Totuși în scurtele momente în care s-a
înseninat, am putut să ieșim în curte pentru un joculeț, două. După-amiaza a plouat continuu, deci a
trebuit să găsim soluți de ateliere care să se poată desfășura la interior, Astfel, ne-am intrecut în
talente și abilități, am aplaudat, ne-am mirat, am comentat și ne-am distrat de minune, în ciuda
vremii.
Activitatea de seară a fost Fashion Show. Prima provocare a serii a fost ca membrii echipelor să
lucreze individual sau împreună pentru a lega șireturile de la adidași într-un mod anume, mai
complicat decât un model obișnuit. Primele trei echipe care au reușit să lege șireturile și-au putut
alege un element în plus pentru proba următoare. La proba principală a serii, copiii au primit un săcut
cu diferențe obiecte reciclate, din care să confecționeze o ținută de gală pentru un membru al
echipei. Provocarea a presupus și să aleagă o melodie pe care să defileze pe scena improvizată,
precum și să creeze o poveste a ținutei: cum le-a venit ideea, cine sunt designerii fiecărui obiect
vestimentar, cine este modelul/make-up artistul etc. Felicitări, copii! Sunteți super creativi, iar
prezentările voastre în limba engleză au fost super convingătoare! Great work, teams!`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1032985534945478&amp;type=3",
        images: [predeal41, predeal42, predeal43, predeal44]
      },
      {
        day: "Ziua 5",
        content: `Penultima zi de tabără a fost plină. După încălzirea de dimineață și cursurile de limbă engleză, primul atelier de după-amiază a fost "Trainer for 15 minutes". Micii noștri traineri i-au învățat pe prietenii lor cum să deseneze un măr care să arate foarte real, un chip de fată, benzi desenate etc. Alții au avut ateliere de japoneză, șah, de fotbal, karate, bătut la tobe, dans, gimnastică, scrimă și multe altele. Colega noastră din Turcia le-a prezentat copiilor un instrument muzical tradițional și le-a cântat câteva cântece la acest instrument și voce. Felicitări tuturor pentru felul în care ați reușit să împărtășiți cu ceilalți din cunoștințele și pasiunile voastre! 🥳  

Al doilea atelier a fost de o provocare pe echipe. Copiii au trebuit să creeze un movie trailer pornind de la cuvinte cheie. Nu a fost o misiune ușoară, dar, cu energie și creativitate, toate echipele au reușit să producă un scurt filmuleț care să includă toți membrii și să răspundă sarcinilor de lucru. 💖  

Ca în fiecare ultimă seară, copiii s-au întrecut în etalarea talentelor. Am avut de toate! De la dans și cântec la demonstrații de karate, scrimă, prezentări de desen sau desene executate pe loc, scenete și glume, rezolvări de cuburi Rubics etc. Mulțumiri și prezentatorilor noștri, ați fost foarte inspirați cu toții! 💖  

A urmat focul de tabără, cu cântece la chitară și voce. Tehnologia ne-a ajutat să urmărim versurile și distracția a culminat cu dansul pinguinului și o horă, la cererea copiilor, desigur :). A fost o atmosferă grozavă! Bravo, copii! Ne bucurăm să vedem că știți să vă distrați și să trăiți momente de poveste în tabără! 💖 
`,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1035027158074649&type=3 ",
        images: [predeal51, predeal52, predeal53, predeal54]
      },
      {
        day: "Ziua 6",
        content: `Ca orice lucru în viață, tot ce începe trebuie să se și termine... Cu promisiunea revederii, ne-am primit diplomele, am făcut poze cu echipa, ne-am scris mesaje pe șepcuțe, am schimbat numere de telefon și ne-am dus bagajul la autocar. Ce frumos a fost totul...  

Pe drumul de întoarcere, am facut un scurt popas la benzinărie pentru o gustare ca se făcuse ora prânzului. Ce bine că am avut voie să ne cumparam ce vrem... Nu chiar orice și nici oricât :) doar știm că părinții ne așteaptă acasă cu bunătăți pe masă, iar regulile taberei în privința alimentației sănătoase se aplică și acum...  

Ultima vizita a fost la Casa de Târgoveț "Hagi Prodan”, unde domnul muzeograf ne-a vorbit despre povestea celei mai vechi case din Ploiești (1785), care are a supravieţuit vremii, vremurilor şi chiar bombardamentelor din timpul celui de-al Doilea Război Mondial. Am primit informații despre ce înseamnă "hagiu" și despre obiceiurile oamenilor din secolele XVIII-XIX, influențele orientului asupra culturii române etc. Tabăra s-a terminat, dar nu și vacanta! Dragi copii, vă dorim o vacanță plină de amintiri plăcute! Pe vara viitoare! Ați fost minunați! `,
        galleryLink: "https://www.facebook.com/media/set/?set=a.1035516414692390&type=3  ",
        images: [predeal61, predeal62, predeal63, predeal64]
      }
    ]
  }
};
const journalList = Object.values(journals);
const JournalPage = () => {
  const { slug } = useParams();
  const journal = useMemo(() => slug ? journals[slug] : void 0, [slug]);
  if (!journal) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("section", { className: "py-16 mt-10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: journal.title }),
      journal.subtitle && /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-2", children: journal.subtitle }),
      journal.campus && /* @__PURE__ */ jsx("p", { className: "text-lg text-foreground font-medium", children: journal.campus }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-primary font-semibold", children: journal.dates })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto space-y-12", children: journal.entries.map((entry, index) => {
      var _a;
      return /* @__PURE__ */ jsx(Card, { className: "bg-card border-border overflow-hidden", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-6", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-lg font-bold", children: entry.day }) }),
        /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none", children: entry.content.split("\n\n").map((paragraph, pIndex) => /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-muted-foreground mb-4 leading-relaxed whitespace-pre-line",
            children: paragraph
          },
          pIndex
        )) }),
        entry.galleryLink && /* @__PURE__ */ jsxs(
          "a",
          {
            href: entry.galleryLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 font-medium transition-colors",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" }),
              "Vezi galeria foto completă aici!"
            ]
          }
        ),
        ((_a = entry.images) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4", children: entry.images.slice(0, 4).map((img, imgIndex) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: img,
                alt: `Galerie ${entry.day} - ${imgIndex + 1}`,
                className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              }
            )
          },
          imgIndex
        )) }) : null
      ] }) }, index);
    }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-12 justify-center", children: [
        /* @__PURE__ */ jsx(Building, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Alte Jurnale de Tabere Pro Erudio" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto", children: journalList.filter((j) => j.slug !== journal.slug).map((j) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `/jurnal/${j.slug}`,
          className: "block",
          children: /* @__PURE__ */ jsxs(Card, { className: "bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "h-40 overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: j.heroImage,
                alt: j.heroAlt || j.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }
            ) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3", children: j.dates }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors", children: j.navbarLabel }),
              j.campus && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: j.campus })
            ] })
          ] })
        },
        j.slug
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const aboutClassroomImage = "/assets/about-classroom-BKM8T9g_.jpg";
const summerCampImage = "/assets/summer-camp-CotNeDP1.jpg";
const AboutPage = () => {
  const canonicalUrl = "https://tabere.proerudio.ro/despre-noi";
  const ogImage = aboutClassroomImage;
  const teamMembers = [
    {
      name: "Maria Popescu",
      role: "Director & Fondator",
      description: "Fondator Pro Erudio, cu peste 14 ani de experiență în organizarea taberelor de engleză.",
      image: summerCampImage
    },
    {
      name: "Andrei Ionescu",
      role: "Coordonator Tabere Internaționale",
      description: "Responsabil pentru taberele din UK și Irlanda, expert în logistică internațională.",
      image: summerCampImage
    },
    {
      name: "Elena Dumitrescu",
      role: "Director Academic",
      description: "Certificată Cambridge CELTA, coordonează programele de engleză din toate taberele.",
      image: summerCampImage
    },
    {
      name: "Alexandru Radu",
      role: "Coordonator Activități & Animație",
      description: "15 ani experiență în animație, creatorul programelor de activități din tabere.",
      image: summerCampImage
    },
    {
      name: "Cristina Munteanu",
      role: "Profesor Engleză Senior",
      description: "Specializată în metode interactive de predare pentru copii și adolescenți.",
      image: summerCampImage
    },
    {
      name: "Dan Georgescu",
      role: "Animator Principal",
      description: "Expert în team building și jocuri educative, adorat de copii în fiecare tabără.",
      image: summerCampImage
    },
    {
      name: "Ioana Stanciu",
      role: "Profesor Engleză",
      description: "Specializată în pregătire Cambridge, participă la taberele internaționale.",
      image: summerCampImage
    },
    {
      name: "Mihai Popa",
      role: "Coordonator Sport & Outdoor",
      description: "Instructor de drumeții și sporturi, responsabil pentru activitățile outdoor.",
      image: summerCampImage
    }
  ];
  const values = [
    {
      icon: Heart,
      title: "Învățare prin Aventură",
      description: "Credem că engleza se învață cel mai bine prin experiențe memorabile și activități captivante."
    },
    {
      icon: Users,
      title: "Siguranță pe Primul Loc",
      description: "Supraveghere 24/7, protocoale stricte și echipă dedicată pentru siguranța fiecărui copil."
    },
    {
      icon: Award,
      title: "Excelență în Educație",
      description: "Profesori certificați Cambridge și metode dovedite pentru progres real în engleză."
    },
    {
      icon: Globe,
      title: "Experiențe Internaționale",
      description: "Tabere în UK, Irlanda și România pentru imersie culturală autentică."
    }
  ];
  const milestones = [
    { year: "2010", event: "Prima tabără de engleză Pro Erudio în România" },
    { year: "2012", event: "Lansarea primei tabere internaționale în Londra" },
    { year: "2014", event: "Extinderea în Irlanda - Dublin și Cork" },
    { year: "2016", event: "Peste 1000 de copii participanți la tabere" },
    { year: "2019", event: "Deschiderea taberelor de iarnă și Paște" },
    { year: "2023", event: "Peste 2500 de absolvenți și 50+ ediții de tabere" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Despre noi – Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Află povestea Pro Erudio: peste 14 ani de experiență în tabere de engleză în România și în străinătate, cu profesori dedicați și activități memorabile."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Despre noi – Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Peste 14 ani de experiență în tabere de engleză în România, UK și Irlanda. Profesori dedicați, siguranță și experiențe memorabile."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Despre noi – Tabere de Engleză Pro Erudio" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "twitter:description",
          content: "Povestea Pro Erudio, echipa și valorile noastre. Tabere de engleză în România și în străinătate."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage })
    ] }),
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("section", { className: "relative pt-16", children: /* @__PURE__ */ jsxs("div", { className: "h-[50vh] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: aboutClassroomImage,
          alt: "Despre Pro Erudio",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-8 lg:p-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4", children: "Despre Noi" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-bold text-foreground mb-4", children: "Tabere de Engleză Pro Erudio" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl", children: "Peste 14 ani de experiență în organizarea taberelor educaționale" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx(Target, { className: "h-8 w-8 text-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Misiunea Noastră" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Pro Erudio organizează tabere de limbă engleză din 2010, cu convingerea că cea mai bună modalitate de a învăța o limbă străină este prin imersie și experiențe de neuitat. Taberele noastre combină cursuri intensive de engleză cu aventură, sport și cultură." }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Misiunea noastră este să oferim copiilor și adolescenților oportunitatea de a învăța engleza într-un mediu internațional, sigur și distractiv, unde fac prieteni din toată lumea și creează amintiri pentru o viață." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Peste 50 de ediții de tabere organizate" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Destinații în România, UK și Irlanda" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Profesori certificați Cambridge și echipă dedicată" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: summerCampImage,
          alt: "Misiunea Pro Erudio",
          className: "w-full h-[400px] object-cover"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Valorile Noastre" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Principiile care ne ghidează în tot ceea ce facem" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map((value, index) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "bg-card border-border text-center hover:shadow-lg transition-shadow",
          children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-8 pb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(value.icon, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground mb-2", children: value.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: value.description })
          ] })
        },
        index
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 justify-center mb-4", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "h-8 w-8 text-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Povestea Noastră" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Momente importante din istoria Pro Erudio" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: milestones.map((milestone, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-primary min-w-[80px]", children: milestone.year }),
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-accent flex-shrink-0" }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground text-lg", children: milestone.event })
      ] }, index)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 justify-center mb-4", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-8 w-8 text-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground", children: "Echipa Noastră" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Profesorii și animatorii care fac taberele noastre speciale" })
      ] }),
      /* @__PURE__ */ jsxs(
        Carousel,
        {
          opts: {
            align: "start",
            loop: true
          },
          className: "w-full",
          children: [
            /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-4", children: teamMembers.map((member, index) => /* @__PURE__ */ jsx(
              CarouselItem,
              {
                className: "pl-4 basis-full sm:basis-1/2 lg:basis-1/4",
                children: /* @__PURE__ */ jsxs(Card, { className: "bg-card border-border overflow-hidden hover:shadow-lg transition-shadow h-full", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-48 overflow-hidden", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: member.image,
                      alt: member.name,
                      className: "w-full h-full object-cover"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(CardContent, { className: "pt-4", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground", children: member.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-primary font-medium text-sm mb-2", children: member.role }),
                    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: member.description })
                  ] })
                ] })
              },
              index
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 mt-8", children: [
              /* @__PURE__ */ jsx(CarouselPrevious, { className: "static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90" }),
              /* @__PURE__ */ jsx(CarouselNext, { className: "static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90" })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-6", children: "Întrebări despre Tabere?" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto", children: "Vrei să afli mai multe despre taberele noastre? Suntem aici să răspundem la toate întrebările tale despre program, locații, prețuri și înscrieri." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Telefon" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "+40 722 123 456" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Mail, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "contact@proerudio.ro" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Adresă" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "București, Sector 1" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-primary", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-primary-foreground mb-4", children: "Rezervă un Loc la Tabără!" }),
        /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 max-w-2xl mx-auto", children: "Înscrierile pentru taberele 2025 sunt deschise. Locurile sunt limitate!" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Card, { className: "bg-card border-0 shadow-2xl", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsx(RegistrationForm, {}) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
      // sau "smooth" daca vrei animat
    });
  }, [pathname]);
  return null;
}
const PlacementTest1 = "/assets/Placement-Test1-BZ2tx4kr.webp";
const PlacementTest2 = "/assets/Placement-Test2-BNVLAEr2.jpg";
const placementTests = [
  {
    id: "yle",
    title: "Test de plasare YLE",
    subtitle: "Pentru copii 8–10 ani (30 întrebări grilă + compunere opțională)",
    image: PlacementTest1,
    questions: [
      { id: 1, prompt: "Choose the correct word: “This is my ___.”", options: [{ key: "a", text: "dog" }, { key: "b", text: "run" }, { key: "c", text: "happy" }], correct: "a" },
      { id: 2, prompt: "Choose the correct form: “She ___ 10 years old.”", options: [{ key: "a", text: "are" }, { key: "b", text: "is" }, { key: "c", text: "am" }], correct: "b" },
      { id: 3, prompt: "What is the correct plural? “Two ___.”", options: [{ key: "a", text: "cat" }, { key: "b", text: "cats" }, { key: "c", text: "cates" }], correct: "b" },
      { id: 4, prompt: "Choose the correct word: “___ apple.”", options: [{ key: "a", text: "A" }, { key: "b", text: "An" }, { key: "c", text: "The" }], correct: "b" },
      { id: 5, prompt: "Choose the correct option: “I ___ football.”", options: [{ key: "a", text: "play" }, { key: "b", text: "plays" }, { key: "c", text: "playing" }], correct: "a" },
      { id: 6, prompt: "Choose the correct word: “It is ___ today.”", options: [{ key: "a", text: "sun" }, { key: "b", text: "sunny" }, { key: "c", text: "sunning" }], correct: "b" },
      { id: 7, prompt: "“Where ___ you from?”", options: [{ key: "a", text: "is" }, { key: "b", text: "are" }, { key: "c", text: "be" }], correct: "b" },
      { id: 8, prompt: "Choose the correct option: “This is ___ book.”", options: [{ key: "a", text: "me" }, { key: "b", text: "my" }, { key: "c", text: "mine" }], correct: "b" },
      { id: 9, prompt: "Choose the correct answer: “The opposite of big is ___.”", options: [{ key: "a", text: "small" }, { key: "b", text: "long" }, { key: "c", text: "tall" }], correct: "a" },
      { id: 10, prompt: "Choose the correct form: “They ___ at school.”", options: [{ key: "a", text: "am" }, { key: "b", text: "is" }, { key: "c", text: "are" }], correct: "c" },
      { id: 11, prompt: "Choose the correct preposition: “The cat is ___ the table.”", options: [{ key: "a", text: "under" }, { key: "b", text: "fast" }, { key: "c", text: "open" }], correct: "a" },
      { id: 12, prompt: "“Can you ___ this word?”", options: [{ key: "a", text: "read" }, { key: "b", text: "red" }, { key: "c", text: "reading" }], correct: "a" },
      { id: 13, prompt: "Choose the correct answer: “Monday is a ___.”", options: [{ key: "a", text: "place" }, { key: "b", text: "color" }, { key: "c", text: "day" }], correct: "c" },
      { id: 14, prompt: "Choose the correct option: “He has two ___.”", options: [{ key: "a", text: "foot" }, { key: "b", text: "feet" }, { key: "c", text: "feets" }], correct: "b" },
      { id: 15, prompt: "Choose the correct word: “I have a ___ bike.”", options: [{ key: "a", text: "blue" }, { key: "b", text: "blues" }, { key: "c", text: "bluing" }], correct: "a" },
      { id: 16, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "She like pizza." }, { key: "b", text: "She likes pizza." }, { key: "c", text: "She liking pizza." }], correct: "b" },
      { id: 17, prompt: "Choose the correct verb: “Birds ___.”", options: [{ key: "a", text: "swim" }, { key: "b", text: "fly" }, { key: "c", text: "drive" }], correct: "b" },
      { id: 18, prompt: "Choose the correct form: “We ___ English.”", options: [{ key: "a", text: "speak" }, { key: "b", text: "speaks" }, { key: "c", text: "speaking" }], correct: "a" },
      { id: 19, prompt: "Choose the correct word: “It is very ___ outside.”", options: [{ key: "a", text: "cold" }, { key: "b", text: "colder" }, { key: "c", text: "coldest" }], correct: "a" },
      { id: 20, prompt: "“This is my mother and that is my ___.”", options: [{ key: "a", text: "sister" }, { key: "b", text: "door" }, { key: "c", text: "table" }], correct: "a" },
      { id: 21, prompt: "Choose the correct option: “Open the ___.”", options: [{ key: "a", text: "window" }, { key: "b", text: "happy" }, { key: "c", text: "slow" }], correct: "a" },
      { id: 22, prompt: "Choose the correct answer: “A cow is an ___.”", options: [{ key: "a", text: "animal" }, { key: "b", text: "color" }, { key: "c", text: "action" }], correct: "a" },
      { id: 23, prompt: "Choose the correct question word: “___ is your name?”", options: [{ key: "a", text: "What" }, { key: "b", text: "Where" }, { key: "c", text: "Who" }], correct: "a" },
      { id: 24, prompt: "Choose the correct answer: “Three plus two is ___.”", options: [{ key: "a", text: "four" }, { key: "b", text: "five" }, { key: "c", text: "six" }], correct: "b" },
      { id: 25, prompt: "Choose the correct verb: “I ___ water.”", options: [{ key: "a", text: "drink" }, { key: "b", text: "drinks" }, { key: "c", text: "drinking" }], correct: "a" },
      { id: 26, prompt: "Choose the correct option: “He ___ a red car.”", options: [{ key: "a", text: "have" }, { key: "b", text: "has" }, { key: "c", text: "haves" }], correct: "b" },
      { id: 27, prompt: "Choose the correct word: “The sky is ___.”", options: [{ key: "a", text: "blue" }, { key: "b", text: "bread" }, { key: "c", text: "write" }], correct: "a" },
      { id: 28, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "They is happy." }, { key: "b", text: "They are happy." }, { key: "c", text: "They am happy." }], correct: "b" },
      { id: 29, prompt: "Choose the correct option: “This is a ___.” 🍎", options: [{ key: "a", text: "banana" }, { key: "b", text: "apple" }, { key: "c", text: "orange" }], correct: "b" },
      { id: 30, prompt: "Choose the correct verb: “Cats ___ milk.”", options: [{ key: "a", text: "like" }, { key: "b", text: "likes" }, { key: "c", text: "liking" }], correct: "a" }
    ],
    writingTask: {
      title: "Sarcină de lucru suplimentară (opțional)",
      details: "Simți că întrebările au fost ușoare și nu evalueaza exact nivelul tău de cunoștință în limba engleză? Ai aici ocazia să ne arăți ce poți prin redactarea unei scurte compuneri.",
      task: "Write a short composition (50–100 words) about your favourite animal. What does it look like? What can it do? Where does it live? What does it eat? Why do you like it?",
      minWords: 50,
      maxWords: 100
    }
  },
  {
    id: "a2b2",
    title: "Test de plasare A2–B2",
    subtitle: "Pentru copii 11–14 ani (30 întrebări grilă + story task opțional)",
    image: PlacementTest2,
    questions: [
      { id: 1, prompt: "If it ___ tomorrow, we’ll stay at home.", options: [{ key: "a", text: "will rain" }, { key: "b", text: "rains" }, { key: "c", text: "rained" }], correct: "b" },
      { id: 2, prompt: "He speaks English ___ than me.", options: [{ key: "a", text: "good" }, { key: "b", text: "well" }, { key: "c", text: "better" }], correct: "c" },
      { id: 3, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "I didn’t used to like coffee." }, { key: "b", text: "I didn’t use to like coffee." }, { key: "c", text: "I didn’t use to liked coffee." }], correct: "b" },
      { id: 4, prompt: "She ___ to the gym every day.", options: [{ key: "a", text: "go" }, { key: "b", text: "goes" }, { key: "c", text: "going" }], correct: "b" },
      { id: 5, prompt: "I haven’t seen him ___ Monday.", options: [{ key: "a", text: "since" }, { key: "b", text: "for" }, { key: "c", text: "from" }], correct: "a" },
      { id: 6, prompt: "The film was ___ than I expected.", options: [{ key: "a", text: "more interesting" }, { key: "b", text: "most interesting" }, { key: "c", text: "interestingest" }], correct: "a" },
      { id: 7, prompt: "They ___ the project by next week.", options: [{ key: "a", text: "will finish" }, { key: "b", text: "will have finished" }, { key: "c", text: "have finished" }], correct: "b" },
      { id: 8, prompt: "___ you ever been to London?", options: [{ key: "a", text: "Did" }, { key: "b", text: "Do" }, { key: "c", text: "Have" }], correct: "c" },
      { id: 9, prompt: "I’m looking forward ___ you again.", options: [{ key: "a", text: "see" }, { key: "b", text: "to see" }, { key: "c", text: "to seeing" }], correct: "c" },
      { id: 10, prompt: "If I ___ more time, I would start a new hobby.", options: [{ key: "a", text: "have" }, { key: "b", text: "had" }, { key: "c", text: "would have" }], correct: "b" },
      { id: 11, prompt: "The opposite of “polite” is ___.", options: [{ key: "a", text: "rude" }, { key: "b", text: "rough" }, { key: "c", text: "wild" }], correct: "a" },
      { id: 12, prompt: "My brother ___ drive when he was 18.", options: [{ key: "a", text: "can" }, { key: "b", text: "could" }, { key: "c", text: "is able" }], correct: "b" },
      { id: 13, prompt: "She asked me ___ I could help her.", options: [{ key: "a", text: "if" }, { key: "b", text: "that" }, { key: "c", text: "what" }], correct: "a" },
      { id: 14, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "The book who I read was great." }, { key: "b", text: "The book which I read was great." }, { key: "c", text: "The book where I read was great." }], correct: "b" },
      { id: 15, prompt: "I don’t have ___ money left.", options: [{ key: "a", text: "some" }, { key: "b", text: "any" }, { key: "c", text: "a" }], correct: "b" },
      { id: 16, prompt: "I promise I ___ you as soon as I arrive.", options: [{ key: "a", text: "call" }, { key: "b", text: "will call" }, { key: "c", text: "am calling" }], correct: "b" },
      { id: 17, prompt: "This exercise is ___ difficult for me.", options: [{ key: "a", text: "enough" }, { key: "b", text: "too" }, { key: "c", text: "very" }], correct: "b" },
      { id: 18, prompt: "The meeting was cancelled, ___ everyone went home early.", options: [{ key: "a", text: "because" }, { key: "b", text: "so" }, { key: "c", text: "although" }], correct: "b" },
      { id: 19, prompt: "He ___ his leg while he was skiing.", options: [{ key: "a", text: "broke" }, { key: "b", text: "has broken" }, { key: "c", text: "was broken" }], correct: "a" },
      { id: 20, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "I’m used to wake up early." }, { key: "b", text: "I’m used to waking up early." }, { key: "c", text: "I used to waking up early." }], correct: "b" },
      { id: 21, prompt: "She told me she ___ late.", options: [{ key: "a", text: "will be" }, { key: "b", text: "would be" }, { key: "c", text: "is" }], correct: "b" },
      { id: 22, prompt: "You must ___ quiet in the library.", options: [{ key: "a", text: "be" }, { key: "b", text: "being" }, { key: "c", text: "to be" }], correct: "a" },
      { id: 23, prompt: "I prefer tea ___ coffee.", options: [{ key: "a", text: "than" }, { key: "b", text: "to" }, { key: "c", text: "with" }], correct: "b" },
      { id: 24, prompt: "By the time we arrived, the film ___.", options: [{ key: "a", text: "started" }, { key: "b", text: "had started" }, { key: "c", text: "has started" }], correct: "b" },
      { id: 25, prompt: "He was very tired, but he kept ___ to finish the work.", options: [{ key: "a", text: "try" }, { key: "b", text: "to trying" }, { key: "c", text: "trying" }], correct: "c" },
      { id: 26, prompt: "If you study harder, you ___ the exam.", options: [{ key: "a", text: "pass" }, { key: "b", text: "passed" }, { key: "c", text: "will pass" }], correct: "c" },
      { id: 27, prompt: "She ___ in Paris for three years.", options: [{ key: "a", text: "lives" }, { key: "b", text: "has lived" }, { key: "c", text: "is living" }], correct: "b" },
      { id: 28, prompt: "It’s the ___ book I’ve ever read.", options: [{ key: "a", text: "more boring" }, { key: "b", text: "most boring" }, { key: "c", text: "boringest" }], correct: "b" },
      { id: 29, prompt: "Choose the correct sentence:", options: [{ key: "a", text: "He told that he was busy." }, { key: "b", text: "He told me that he was busy." }, { key: "c", text: "He said me that he was busy." }], correct: "b" },
      { id: 30, prompt: "I’ll go to the party if I ___ free.", options: [{ key: "a", text: "am" }, { key: "b", text: "will be" }, { key: "c", text: "would be" }], correct: "a" }
    ],
    writingTask: {
      title: "Sarcină de lucru suplimentară (opțional)",
      details: "Simți că întrebările au fost ușoare și nu evalueaza exact nivelul tău de cunoștință în limba engleză? Ai aici ocazia să ne arăți ce poți prin redactarea unei scurte compuneri.",
      task: "Write a story (120–180 words) beginning with: “It was a cold October evening when I heard a strange noise coming from behind the kitchen door…” Include a clear sequence of events, descriptive details, and a surprising ending.",
      minWords: 50,
      maxWords: 100
    }
  }
];
function TesteAmplasament() {
  const [step, setStep] = useState("form");
  const [student, setStudent] = useState({ firstName: "", lastName: "", age: "", email: "" });
  const [selectedTestId, setSelectedTestId] = useState("yle");
  const test = useMemo(() => placementTests.find((t) => t.id === selectedTestId), [selectedTestId]);
  const [answers, setAnswers] = useState({});
  const [writing, setWriting] = useState("");
  const canStart = student.firstName.trim().length > 1 && student.lastName.trim().length > 1 && typeof student.age === "number";
  const answeredCount = Object.keys(answers).length;
  const total = test.questions.length;
  function startTest() {
    if (!canStart) return;
    setAnswers({});
    setWriting("");
    setStep("test");
  }
  function submitTest() {
    setStep("done");
  }
  return /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8 max-w-5xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-primary text-center mb-10", children: "Test de plasare pentru cursul de limba engleză" }),
    step === "form" && /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground mb-6", children: "Date elev" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "h-11 rounded-xl border border-border bg-background px-4 text-foreground",
            placeholder: "Nume",
            value: student.lastName,
            onChange: (e) => setStudent((s) => ({ ...s, lastName: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "h-11 rounded-xl border border-border bg-background px-4 text-foreground",
            placeholder: "Prenume",
            value: student.firstName,
            onChange: (e) => setStudent((s) => ({ ...s, firstName: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: 6,
            max: 18,
            className: "h-11 rounded-xl border border-border bg-background px-4 text-foreground",
            placeholder: "Vârstă",
            value: student.age,
            onChange: (e) => setStudent((s) => ({ ...s, age: e.target.value === "" ? "" : Number(e.target.value) }))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx(
          "input",
          {
            className: "h-11 rounded-xl border border-border bg-background px-4 text-foreground",
            placeholder: "Email (opțional)",
            value: student.email,
            onChange: (e) => setStudent((s) => ({ ...s, email: e.target.value }))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Alege testul" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: placementTests.map((t) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedTestId(t.id),
            className: `rounded-xl border px-4 py-3 text-left transition duration-300 ease-in-out ${selectedTestId === t.id ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-secondary/40"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground", children: t.title }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: t.subtitle }),
              t.image && /* @__PURE__ */ jsx(
                "img",
                {
                  src: t.image,
                  alt: t.title,
                  className: "mt-3 h-40 w-full rounded-xl object-cover border border-border",
                  loading: "lazy"
                }
              )
            ]
          },
          t.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: startTest,
          disabled: !canStart,
          className: `h-11 px-6 rounded-xl font-semibold transition duration-300 ease-in-out ${canStart ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`,
          children: "Începe testul"
        }
      ) })
    ] }),
    step === "test" && /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 md:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground", children: test.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Progres: ",
            answeredCount,
            "/",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep("form"),
            className: "h-10 px-4 rounded-xl border border-border hover:bg-secondary/40 transition duration-300 ease-in-out",
            children: "Înapoi la formular"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: test.questions.map((q) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-semibold text-foreground mb-3", children: [
          q.id,
          ". ",
          q.prompt
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: q.options.map((opt) => {
          const selected = answers[q.id] === opt.key;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAnswers((a) => ({ ...a, [q.id]: opt.key })),
              className: `rounded-xl border px-4 py-3 text-left transition duration-300 ease-in-out ${selected ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/40"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mb-1", children: opt.key.toUpperCase() }),
                /* @__PURE__ */ jsx("div", { className: "text-foreground", children: opt.text })
              ]
            },
            opt.key
          );
        }) })
      ] }, q.id)) }),
      test.writingTask && /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-border p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground mb-2", children: test.writingTask.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: test.writingTask.details }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-primary mb-4 ", children: test.writingTask.task }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "w-full min-h-[160px] rounded-xl border border-border bg-background p-4 text-foreground",
            placeholder: "Scrie aici (opțional)...",
            value: writing,
            onChange: (e) => setWriting(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: submitTest,
          className: "h-11 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:opacity-90 transition duration-300 ease-in-out",
          children: "Trimite testul"
        }
      ) })
    ] }),
    step === "done" && /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Mulțumim!" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Testul a fost înregistrat. Vei primi rezultatul pe email după evaluare." }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          className: "bg-primary text-primary-foreground px-6 rounded-full\r\n                   transition duration-300 ease-in-out hover:opacity-90",
          children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Înapoi la pagina principală" })
        }
      ) })
    ] })
  ] }) });
}
const DeclaratieConsimtamant = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background py-40", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-8 text-center", children: "Declarație de consimțământ" }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none text-foreground", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Declar prin aceasta că sunt de acord cu participarea copilului meu/minorului aflat sub tutela mea la cursurile organizate de",
          /* @__PURE__ */ jsx("strong", { children: " Centrul Pro Erudio SRL" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Îmi exprim în mod expres și neechivoc acordul privind prelucrarea următoarelor date cu caracter personal ale Minorului aflat sub tutela mea: nume și prenume, vârstă, școala de proveniență, de către Organizator pe întreaga durată a desfășurării cursurilor." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Totodată, sunt de acord ca societatea ",
          /* @__PURE__ */ jsx("strong", { children: "Centrul Pro Erudio SRL" }),
          ", cu sediul în ",
          /* @__PURE__ */ jsx("strong", { children: "Bd. George Coșbuc, nr. 69, Sector 5, București, România" }),
          ", să fie autorizată să proceseze datele mele personale introduse în formularul de înregistrare client, precum și datele colectate în cadrul tranzacțiilor comerciale, în următoarele scopuri: furnizarea de informații prin e-mail, SMS, telefon sau platforme de social media referitoare la campanii de marketing, oferte speciale, evenimente și/sau alte forme de publicitate, precum și contactarea în vederea desfășurării sondajelor de opinie."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Consimțământul privind prelucrarea datelor cu caracter personal este voluntar și poate fi revocat în orice moment, cu efect ulterior, printr-o notificare gratuită către ",
          /* @__PURE__ */ jsx("strong", { children: "Centrul Pro Erudio SRL" }),
          ", transmisă verbal sau în scris (e-mail către ",
          /* @__PURE__ */ jsx("strong", { children: "office@proerudio.ro" }),
          ")."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Revocarea consimțământului nu afectează legalitatea utilizării datelor realizate anterior retragerii acestuia." }),
        /* @__PURE__ */ jsx("p", { className: "text-center font-semibold mt-10", children: "Vă mulțumim pentru colaborare!" }),
        /* @__PURE__ */ jsx("p", { className: "text-center font-bold mt-4", children: "PRO ERUDIO SCHOOL OF ENGLISH" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const RegulamentFunctionare = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background py-40", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground text-center pb-6", children: "REGULAMENT DE FUNCȚIONARE" }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Regulamentul centrului cuprinde un set de norme elaborate cu scopul implementării unei activități educaționale de calitate." }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Regulamentul se adresează copiilor și părinților în relație cu PRO ERUDIO SCHOOL OF ENGLISH, având aplicabilitate deplină în interiorul centrului." }),
      /* @__PURE__ */ jsx("p", { className: "pb-10 text-foreground", children: "Regulamentul trebuie respectat de către toți părinții și copiii acestora, participanți la activitățile centrului și în cadrul cursurilor online." }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "1. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Punctualitate" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-10 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Părinții și copiii sunt rugați să respecte ora la care încep și se finalizează cursurile, indiferent dacă ele se desfășoară online sau la sediul centrului." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "PRO ERUDIO SCHOOL OF ENGLISH nu își asumă răspunderea pentru siguranța copiilor în afara orelor de curs." })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "2. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Prezență" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Atât pentru cursurile la sediu, cât și pentru cele online, prezența copiilor va fi atent monitorizată în foaia de prezență a grupei. Întârzierile și absențele repetate pot duce la un nivel scăzut de performanță, pe care PRO ERUDIO SCHOOL OF ENGLISH nu și-l asumă." }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Este acceptată o frecvență din partea copiilor conform programului asumat de către părinți, aceasta fiind un factor esențial în dezvoltarea educațională de succes." }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "În cazul absenței de la orele de curs din motive întemeiate (îmbolnăviri sau activități programate cu școala în cadrul săptămânilor Școala Verde sau Școala Altfel), vă rugăm să optați pentru una dintre cele două variante defiecare dată când absențați:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Participare online la curs (camera video pornită și îndreptată spre copil)." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Recuperarea cursului cu o altă grupă de același nivel (nu garantăm recuperarea materiei predate când a absentat întrucât grupele pot să aibă un ritm diferit de lucru)." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "pb-3 text-foreground", children: [
        "Pentru a putea participa online sau recupera cursul cu o grupă paralelă este necesară trimiterea unui mesaj la numărul",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "0771 753 323" }),
        " în care să vă anunțați opțiunea. Anunțarea absenței se efectuează doar de către părinți, indiferent de vârsta copilului."
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-10 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În cazul neanunțării la timp a absenței, cursurile se consideră efectuate. Participarea online la curs se anunță cu minimum trei ore înainte de curs, iar absențele pentru recuperare cu o zi înainte de curs." }),
        /* @__PURE__ */ jsxs("li", { className: "pb-2", children: [
          "În cazul în care copilul este spitalizat sau suferă de o problemă medicală care să nu îi permită participarea online la curs și nici recuperarea cursului în grupe paralele, părintele va trimite o poză cu scutirea medicală pe whatsapp la",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "0771 753 323" }),
          " și se vor găsi soluții de compensare a plăților, dacă este raportarea să demonstreze ratarea următoare tranșe de plată."
        ] }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Centrul Pro Erudio nu își asumă răspunderea pentru transmiterea temelor, dar îi încurajăm pe copii să și le ceară aceste informații. În secolul tehnologiei ar trebui să fie ușor pe telefon." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În situația în care sunt anunțate la o anumită grupă cazuri de îmbolnăviri cu virusul SARS COV2 sau chiar de gripă sezonieră, este posibil ca Pro Erudio School of English să decidă ca toată grupa să își desfășoare activitățile online cu limita răspândirea virusurilor." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În situația în care vreunul dintre profesorii Pro Erudio este diagnosticat cu o boală contagioasă, toate cursurile se trec în mediul online până la trecerea pericolului de infectare (minim două săptămâni)." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Pro Erudio School of English își rezervă dreptul de a schimba numărul de cursanți dintr-o grupă în acord cu reglementările locale sau regionale, precum și dreptul de a schimba orarele și zilele cursurilor în caz de forță majoră. Dacă această situație va impune trecerea de la predare față-n-față la predare virtuală, ne rezervăm dreptul de a schimba componența, durata, orarul cursului, profesorul etc, dar vom face tot ce este posibil să asigurăm continuarea cursurilor fără modificări." })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "3. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Conduită" })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-10 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Copiii mai mici de clasa a II-a sunt preluați din sala de așteptare sau din curte și însoțiți la sala de curs de către cadrele didactice ale centrului. Pe cât durata cursurilor copilul se află sub directa supraveghere a cadrelor didactice ale centrului." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Copiii cu vârste peste 8 ani sunt invitați să meargă singuri la clasa de curs cu maxim 5 minute înainte de ora prevăzută pentru începerea cursului." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În timpul petrecut în sala de așteptare înainte de începerea cursurilor le interzicem elevilor să folosească telefonul pentru jocuri. Această activitate poate fi înlocuită cu o lectură ușoară (vor găsi acolo cărțile de răsfoit pe toate gusturile) sau discuții cu colegii." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Părinții și copiii au obligația de a respecta indicațiile cu privire la accesul în zonele restricționate. Până la începerea cursurilor și după finalizarea acestora, întreaga răspundere asupra siguranței copilului aparține adultului însoțitor." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În sala de curs este interzis accesul cu alimente sau pahare ce conțin lichide. Pe perioada desfășurării cursului este permisă utilizarea recipientelor speciale prevăzute cu capac de protecție (sticle sau bidoane de apă)." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Pe perioada desfășurării activităților în cadrul centrului, părinții/adulții însoțitori ai copiilor sunt rugați să utilizeze sala de așteptare și terasa." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Pentru buna desfășurare a activităților în cadrul centrului este interzisă staționarea pe culoarele și scările de acces ale centrului." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Fumatul este interzis în incinta centrului." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Este interzis accesul copiilor însoțiți pe terasă sau în curte interioară." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Orice degradare a bunurilor centrului atrage după sine recuperarea integrală a costului obiectului deteriorat." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Vă rugăm să păstrați curățenia în spațiile comune: sala de așteptare, terasă, curte interioară, toalete etc." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În cazul în care copiii mici au nevoie la toaletă, vă rugăm să îi însoțiți pentru a vă asigura că spațiul a rămas curat în urma utilizării și că se respectă regulile de igienă de îndată." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În cazul în care părinții îi trimit pe copii cu obiecte de valoare asupra lor, PRO ERUDIO SCHOOL OF ENGLISH nu își asumă responsabilitatea pentru pierderea acestor obiecte." })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "4. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Comunicarea cu părinții" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground pb-2", children: "Evaluare și feedback" }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Pe lângă o evaluare inițială (în afară de modul engleză să scris, nimic cum trebuie să fie înțeles, cu probleme mai complexe de gramatică), în a doua jumătate a lunilor ianuarie și sfârșitul lunii mai, facem o evaluare a tuturor abilităților (scris, vorbit, înțelegerea mesajului scris și ascultat), iar rezultatele se descarcă într-un Raport de evaluare a progresului. Aceste document sunt modalitatea principală prin care dorim să vă informăm asupra progresului fiului/fiicei dvs în învățarea limbii engleze, motiv pentru care vă rugăm să le semnați de primire. Rapoartele pot rămâne în Portofoliile copiilor pentru a le da și lor măsura propriului progres. Vă mulțumim pentru sprijin!" }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Pe lângă aceste rapoarte, păstrăm canalele de comunicare deschise permanent prin următoarele modalități:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Comunicare prin intermediul panourilor informative sau a paginilor noastre de social media (Facebook, Instagram, TikTok)." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Pentru o bună informare asupra activității centrului, vă recomandăm să citiți anunțurile afișate periodic." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Corespondență prin e-mail." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "pb-3 text-foreground", children: [
        "Avem rugămintea ca părinții să comunice adresele de e-mail corecte, iar în cazul modificărilor acestora să ne informeze pentru a putea reactualiza baza de date. Adresele de email sunt folosite doar de către personalul centrului pentru corespondență și trimitere informații părinților. Adresa de email a profesorului este",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "proerudio.premiumprofesorg@gmail.com" }),
        " (proerudio.elena@gmail.com), corespondența trebuie făcută doar de la email a profesorului."
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Corespondență telefonică" }) }),
      /* @__PURE__ */ jsxs("p", { className: "pb-3 text-foreground", children: [
        "(folosind număr unic ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "0771 753 323" }),
        " conform orarului afișat în sala de așteptare la CONSULTAȚII CU PROFESORI)."
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Discuție telefonică sau față-n față cu profesorul grupei." }) }),
      /* @__PURE__ */ jsxs("p", { className: "pb-3 text-foreground", children: [
        "Telefonic, la numărul unic ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "0771 753 323" }),
        ", conform orarului afișat în sala de așteptare la CONSULTAȚII CU PROFESORI și trimis în email. Pentru consultații față-n-față este necesar să faceți o programare folosind numărul unic, ne contactând direct profesorul."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "pb-10 text-foreground font-semibold", children: [
        "Centrul Pro Erudio își dorește o bună colaborare și comunicare cu părinții, de aceea vă rugăm să ne transmiteți fără întârziere orice problemă sesizată folosind oricare din numerele disponibile la Contact sau prin email la",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "office@proerudio.ro" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "5. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Politica financiară" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Începând cu anul școlar 2025–2026 există trei modalități de plată a cursurilor:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Plata lunară se efectuează în prima săptămână din lună pentru luna în curs prin înmulțirea numărului maxim de ședințe cu prețul unei ședințe." }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "Plata în cincitranșe egale (5% reducere), conform informațiilor primite în fișa de reînscriere (pentru cei care au frecventat și anul trecut cursurile noastre) sau pe site (pentru copiii înscriși cu acest an școlar)." }),
        /* @__PURE__ */ jsxs("li", { className: "pb-2", children: [
          "Plata integrală (10% reducere) efectuată până pe ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "20 septembrie" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Plata cursurilor se poate face în cont sau la casierie (cash sau card)." }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Întârzierile la plată pot duce la perceperea penalităților, majorarea taxei de curs sau pierderea locului în grupă." }),
      /* @__PURE__ */ jsx("p", { className: "pb-2 text-foreground", children: "Toate reducerile (mai puțin pentru plata integrală) se aplică la ultima tranșă de plată din anul școlar 2025–2026 și sunt după cum urmează:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: [
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "10% reducere pentru al doilea curs" }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "10% reducere pentru al doilea frate înscris la cursuri" }),
        /* @__PURE__ */ jsx("li", { className: "pb-2", children: "10% reducere pentru copil de cadre didactice" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-3 text-foreground", children: "Reduceriile nu se cumulează!" }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6 pb-4 text-foreground", children: /* @__PURE__ */ jsx("li", { className: "pb-2", children: "În cazul în care doriți să retrageți copilul de la cursurile noastre, vă rugăm să ne anunțați această intenție cu cel puțin o săptămână, preferabil o lună, înainte. Retragerea se operează și se calculează diferența de plată sau de restituit (dacă în care se retrag după modul de transmitere) doar după săptămâna de “previz”, săptămâna în care copiii sunt așteptați în continuare la cursuri." }) }),
      /* @__PURE__ */ jsxs("p", { className: "pb-3 text-foreground", children: [
        "Toate vacanțele sunt în conformitate cu calendarul nostru școlar, așa cum este el anunțat aici (STRUCTURA ANULUI ȘCOLAR) și",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "NU" }),
        " se supun taxei de curs."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-10 text-foreground", children: "În săptămâna Școala Altfel și Școala Verde se desfășoară cursuri conform programului obișnuit." }),
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-foreground pb-2", children: [
        "6. ",
        /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Evenimente și module speciale" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "pb-10 text-foreground", children: "Ocazional, Pro Erudio organizează evenimente (Petrecere Halloween, simulare examene Cambridge English, ateliere de dezvoltare emoțională etc) sau module speciale (conversație, pregătire pentru examene, cursuri de vară, etc), care vin în completarea activității curente. Participarea la aceste module (deseori gratuită sau la prețuri preferențiale pentru cursanții Pro Erudio) este opțională, iar înscrierea este obligatorie prin email/sms și ocuparea locurilor se face în ordinea rezervării." }),
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-foreground pb-2", children: "IMPORTANT!" }),
      /* @__PURE__ */ jsx("p", { className: "pb-10 text-foreground", children: "Prin participarea la cursuri și evenimentele noastre vă exprimați acordul cu privire la folosirea imaginilor surprinse în timpul desfășurării activităților în scop promoțional al activității noastre. Vă informăm că utilizarea imaginilor surprinse într-un spațiu public, chiar și clădiri, nu aduce atingere reputației ori demnității persoanei fotografiate/filmate, acestea fiind în caz de fapt. Cu toate acestea, dacă doriți ca fiul/ fiica dvs. să nu fie sub nicio formă fotografiat(ă)/filmat(ă), vă rugăm să ne anunțați la înscriere/reînscriere și vom respecta solicitarea dvs." }),
      /* @__PURE__ */ jsx("p", { className: "text-center font-semibold text-foreground pb-2", children: "Vă mulțumim pentru colaborare!" }),
      /* @__PURE__ */ jsx("p", { className: "text-center font-bold text-foreground", children: "PRO ERUDIO SCHOOL OF ENGLISH" })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const JurnaleTabara = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("section", { className: "pt-40 bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Jurnale de Tabără Pro Erudio" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed", children: "Descoperă povești, momente și activități din taberele noastre. Fiecare jurnal surprinde zi cu zi experiența copiilor, atmosfera și amintirile create împreună." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: journalList.map((j) => /* @__PURE__ */ jsx("a", { href: `/jurnal/${j.slug}`, className: "block", children: /* @__PURE__ */ jsxs(Card, { className: "bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "h-40 overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: j.heroImage,
          alt: j.heroAlt || j.title,
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        }
      ) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "pt-4 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3", children: j.dates }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors", children: j.navbarLabel }),
        j.campus && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: j.campus })
      ] })
    ] }) }, j.slug)) }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const queryClient = new QueryClient();
function Layout() {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) }) });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Layout, {}),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(Index, {}) },
      { path: "despre-noi", element: /* @__PURE__ */ jsx(AboutPage, {}) },
      { path: "test-de-plasare", element: /* @__PURE__ */ jsx(TesteAmplasament, {}) },
      { path: "declaratie-consimtamant", element: /* @__PURE__ */ jsx(DeclaratieConsimtamant, {}) },
      { path: "regulament", element: /* @__PURE__ */ jsx(RegulamentFunctionare, {}) },
      { path: "jurnale", element: /* @__PURE__ */ jsx(JurnaleTabara, {}) },
      ...campsData.map((c) => ({
        path: c.slug,
        element: /* @__PURE__ */ jsx(CampPage, { slugOverride: c.slug })
      })),
      // ⚠️ dinamice (NU SSG by default)
      { path: ":slug", element: /* @__PURE__ */ jsx(CampPage, {}) },
      { path: "jurnal/:slug", element: /* @__PURE__ */ jsx(JournalPage, {}) },
      { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }
    ]
  }
];
const createRoot = ViteReactSSG({
  routes,
  basename: "/"
});
export {
  createRoot
};
//# sourceMappingURL=main.mjs.map
