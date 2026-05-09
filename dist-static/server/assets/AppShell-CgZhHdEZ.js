import { O as useRouter, r as reactExports, W as jsxRuntimeExports, a2 as React } from "./server-Bz2IzkDK.js";
import { r as reactDomExports, R as ReactDOM, t as toast, u as useCineVault, L as Link, b as ARCHETYPE_IDS, A as ARCHETYPES } from "./router-DhFfcMSV.js";
import { A as AnimatePresence, m as motion } from "./proxy-Dj0UfWx2.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$g = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$g);
const __iconNode$f = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$f);
const __iconNode$e = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$e);
const __iconNode$d = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode$d);
const __iconNode$c = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$c);
const __iconNode$b = [
  ["path", { d: "m16 6 4 14", key: "ji33uf" }],
  ["path", { d: "M12 6v14", key: "1n7gus" }],
  ["path", { d: "M8 8v12", key: "1gg7y9" }],
  ["path", { d: "M4 4v16", key: "6qkkli" }]
];
const Library = createLucideIcon("library", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
];
const Mic = createLucideIcon("mic", __iconNode$9);
const __iconNode$8 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$8);
const __iconNode$7 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",
      key: "10td1f"
    }
  ],
  ["path", { d: "M10 22 9 8", key: "yjptiv" }],
  ["path", { d: "m14 22 1-14", key: "8jwc8b" }],
  [
    "path",
    {
      d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
      key: "1qo33t"
    }
  ]
];
const Popcorn = createLucideIcon("popcorn", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
function createContext2(rootComponentName, defaultContext) {
  const Context = reactExports.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = reactExports.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = reactExports.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var useLayoutEffect2 = globalThis?.document ? reactExports.useLayoutEffect : () => {
};
var useReactId = React[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
  const [id, setId] = reactExports.useState(useReactId());
  useLayoutEffect2(() => {
    setId((reactId) => reactId ?? String(count$1++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = reactExports.useRef(prop !== void 0);
    reactExports.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = reactExports.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = reactExports.useState(defaultProp);
  const prevValueRef = reactExports.useRef(value);
  const onChangeRef = reactExports.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  reactExports.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
// @__NO_SIDE_EFFECTS__
function createSlot$2(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone$2(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable$2);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone$2(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$3(children);
      const props2 = mergeProps$2(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER$2 = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable$2(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER$2;
}
function mergeProps$2(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$3(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot$2(`Primitive.${node}`);
  const Node2 = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) reactDomExports.flushSync(() => target.dispatchEvent(event));
}
function useCallbackRef$1(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = reactExports.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = reactExports.useContext(DismissableLayerContext);
    const [node, setNode] = reactExports.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = reactExports.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    reactExports.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    reactExports.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    reactExports.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = reactExports.forwardRef((props, forwardedRef) => {
  const context = reactExports.useContext(DismissableLayerContext);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
  const isPointerInsideReactTreeRef = reactExports.useRef(false);
  const handleClickRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef$1(onFocusOutside);
  const isFocusInsideReactTreeRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = reactExports.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = reactExports.useState(null);
  const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
  const lastFocusedElementRef = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = reactExports.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  reactExports.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  reactExports.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var PORTAL_NAME$1 = "Portal";
var Portal$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = reactExports.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal$1.displayName = PORTAL_NAME$1;
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef$2(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef$2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var count = 0;
function useFocusGuards() {
  reactExports.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = reactExports.useState(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return reactExports.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll = reactExports.forwardRef(function(props, parentRef) {
  var ref = reactExports.useRef(null);
  var _a = reactExports.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    enabled && reactExports.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : reactExports.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    reactExports.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet2 = function(_a) {
    var styles = _a.styles, dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet2;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  reactExports.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = reactExports.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return reactExports.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = reactExports.useRef([]);
  var touchStartRef = reactExports.useRef([0, 0]);
  var activeAxis = reactExports.useRef();
  var id = reactExports.useState(idCounter++)[0];
  var Style2 = reactExports.useState(styleSingleton)[0];
  var lastProps = reactExports.useRef(props);
  reactExports.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  reactExports.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var selection = window.getSelection();
    var anchorNode = selection && selection.anchorNode;
    var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
    if (isTouchingSelection) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY);
  }, []);
  var shouldPrevent = reactExports.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = reactExports.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  reactExports.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    inert ? reactExports.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? reactExports.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
  return reactExports.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
// @__NO_SIDE_EFFECTS__
function createSlot$1(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone$1(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable$1);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone$1(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$1(children);
      const props2 = mergeProps$1(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER$1 = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable$1(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$1(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay.displayName = OVERLAY_NAME;
var Slot$1 = /* @__PURE__ */ createSlot$1("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot$1, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog;
var Trigger = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
const createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
const createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
const CLASS_PART_SEPARATOR = "-";
const EMPTY_CONFLICTS = [];
const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
const createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
const processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
const getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const EMPTY_MODIFIERS = [];
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
const createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
const twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelWeight = (label) => label === "number" || label === "weight";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const img = (path) => `https://image.tmdb.org/t/p/w500${path}`;
const MOVIES = [
  { id: "inception", title: "Inception", year: 2010, runtime: 148, genres: ["Sci-Fi", "Thriller"], poster: img("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"), moodTags: ["think", "intense", "epic"], blurb: "Dreams within dreams." },
  { id: "moonlight", title: "Moonlight", year: 2016, runtime: 111, genres: ["Drama"], poster: img("/4911T5FbJ9eD2Faz5Z8cT3SUhU3.jpg"), moodTags: ["beautiful", "tear", "think"], blurb: "A life in three chapters." },
  { id: "john-wick", title: "John Wick", year: 2014, runtime: 101, genres: ["Action"], poster: img("/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"), moodTags: ["intense", "light"], blurb: "They killed his dog." },
  { id: "coco", title: "Coco", year: 2017, runtime: 105, genres: ["Animation", "Family"], poster: img("/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"), moodTags: ["comfort", "tear", "beautiful"], blurb: "Remember me." },
  { id: "arrival", title: "Arrival", year: 2016, runtime: 116, genres: ["Sci-Fi", "Drama"], poster: img("/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg"), moodTags: ["think", "beautiful", "tear"], blurb: "Language is a weapon." },
  { id: "knives-out", title: "Knives Out", year: 2019, runtime: 130, genres: ["Mystery", "Comedy"], poster: img("/pThyQovXQrw2m0s9x82twj48Jq4.jpg"), moodTags: ["light", "laugh", "think"], blurb: "A whodunit with teeth." },
  { id: "morbius", title: "Morbius", year: 2022, runtime: 104, genres: ["Action"], poster: img("/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg"), moodTags: ["light"], blurb: "It's Morbin' time." },
  { id: "game-night", title: "Game Night", year: 2018, runtime: 100, genres: ["Comedy"], poster: img("/iDJTeMOKxD7s2Ki8SI26zk2DEcZ.jpg"), moodTags: ["laugh", "light"], blurb: "Stupid fun, done right." },
  { id: "parasite", title: "Parasite", year: 2019, runtime: 132, genres: ["Thriller", "Drama"], poster: img("/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"), moodTags: ["think", "intense"], blurb: "Class war, basement dwellers." },
  { id: "her", title: "Her", year: 2013, runtime: 126, genres: ["Romance", "Sci-Fi"], poster: img("/lEIaL12hSkqZE83kE18MwygO2cu.jpg"), moodTags: ["beautiful", "tear", "think"], blurb: "Falling for the voice in your ear." },
  { id: "mad-max", title: "Mad Max: Fury Road", year: 2015, runtime: 120, genres: ["Action"], poster: img("/hA2ple9q4qnwxp3hKVNhroipsir.jpg"), moodTags: ["intense", "epic", "beautiful"], blurb: "What a lovely day." },
  { id: "spirited-away", title: "Spirited Away", year: 2001, runtime: 125, genres: ["Animation", "Fantasy"], poster: img("/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"), moodTags: ["beautiful", "comfort", "tear"], blurb: "A bathhouse for the spirits." },
  { id: "the-prestige", title: "The Prestige", year: 2006, runtime: 130, genres: ["Mystery", "Drama"], poster: img("/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg"), moodTags: ["think", "intense"], blurb: "Are you watching closely?" },
  { id: "amelie", title: "Amélie", year: 2001, runtime: 122, genres: ["Romance", "Comedy"], poster: img("/ffxqUzc7iX4suYThRHQSDPxqEoy.jpg"), moodTags: ["comfort", "beautiful", "light"], blurb: "Small joys in Montmartre." },
  { id: "the-thing", title: "The Thing", year: 1982, runtime: 109, genres: ["Horror", "Sci-Fi"], poster: img("/tzGY49kseSE9QAKk47uuDGwnSCu.jpg"), moodTags: ["intense"], blurb: "Trust no one." },
  { id: "before-sunrise", title: "Before Sunrise", year: 1995, runtime: 101, genres: ["Romance", "Drama"], poster: img("/5DnhCpCzEsPiWvfPjN6QmRNj9oS.jpg"), moodTags: ["beautiful", "tear", "comfort"], blurb: "One night in Vienna." },
  { id: "no-country", title: "No Country for Old Men", year: 2007, runtime: 122, genres: ["Thriller", "Drama"], poster: img("/bj9DslqXk3pBoIB9b9pCGFblRdg.jpg"), moodTags: ["intense", "think"], blurb: "Call it, friendo." },
  { id: "wall-e", title: "WALL·E", year: 2008, runtime: 98, genres: ["Animation", "Family"], poster: img("/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg"), moodTags: ["comfort", "beautiful", "tear"], blurb: "A robot, a plant, a planet." },
  { id: "the-departed", title: "The Departed", year: 2006, runtime: 151, genres: ["Crime", "Thriller"], poster: img("/nT97ifVT2J1yMQmeq20Qblg61T.jpg"), moodTags: ["intense", "think"], blurb: "Rats inside the rats." },
  { id: "lalaland", title: "La La Land", year: 2016, runtime: 128, genres: ["Romance", "Musical"], poster: img("/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), moodTags: ["beautiful", "tear", "comfort"], blurb: "City of stars." },
  { id: "annihilation", title: "Annihilation", year: 2018, runtime: 115, genres: ["Sci-Fi", "Horror"], poster: img("/d3tFAJjyaIcuG4SAjsi9e7M0c44.jpg"), moodTags: ["think", "beautiful", "intense"], blurb: "Inside the shimmer." },
  { id: "everything-everywhere", title: "Everything Everywhere All at Once", year: 2022, runtime: 139, genres: ["Sci-Fi", "Comedy"], poster: img("/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg"), moodTags: ["laugh", "tear", "think", "beautiful"], blurb: "Be a rock with me." },
  { id: "drive", title: "Drive", year: 2011, runtime: 100, genres: ["Crime", "Drama"], poster: img("/602vevIURmpDfzbnv5Ubi6wIkQm.jpg"), moodTags: ["beautiful", "intense"], blurb: "A real human being." },
  { id: "the-grand-budapest", title: "The Grand Budapest Hotel", year: 2014, runtime: 99, genres: ["Comedy", "Drama"], poster: img("/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg"), moodTags: ["laugh", "beautiful", "comfort"], blurb: "Pastel violence and Mendl's." },
  { id: "interstellar", title: "Interstellar", year: 2014, runtime: 169, genres: ["Sci-Fi", "Drama"], poster: img("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), moodTags: ["epic", "tear", "think", "beautiful"], blurb: "Love is the one thing." },
  { id: "the-shining", title: "The Shining", year: 1980, runtime: 146, genres: ["Horror"], poster: img("/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg"), moodTags: ["intense", "think"], blurb: "All work and no play." },
  { id: "in-the-mood", title: "In the Mood for Love", year: 2e3, runtime: 98, genres: ["Romance", "Drama"], poster: img("/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg"), moodTags: ["beautiful", "tear"], blurb: "Lonely halls, longing eyes." },
  { id: "shawshank", title: "The Shawshank Redemption", year: 1994, runtime: 142, genres: ["Drama"], poster: img("/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"), moodTags: ["comfort", "tear", "epic"], blurb: "Hope is a good thing." },
  { id: "spider-verse", title: "Spider-Man: Into the Spider-Verse", year: 2018, runtime: 117, genres: ["Animation", "Action"], poster: img("/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"), moodTags: ["beautiful", "light", "epic"], blurb: "Anyone can wear the mask." },
  { id: "the-lighthouse", title: "The Lighthouse", year: 2019, runtime: 109, genres: ["Drama", "Horror"], poster: img("/3nk9UoepYmv1FMzqfd91jxAXbtC.jpg"), moodTags: ["intense", "beautiful"], blurb: "Why'd ya spill yer beans." }
];
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function PopChat() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([
    { role: "assistant", text: "What are you in the mood for tonight?" }
  ]);
  const [input, setInput] = reactExports.useState("");
  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: "Something dark but beautiful. I'd suggest Blade Runner 2049. Trust me." }]);
    }, 1e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 right-6 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
    !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        onClick: () => setIsOpen(true),
        className: "w-14 h-14 rounded-full bg-black/80 backdrop-blur-lg border border-white/20 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl relative z-10", children: "🍿" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        className: "w-[340px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🍿" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white text-sm", children: "PopChat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/50 uppercase tracking-widest", children: "Your Movie Buddy" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "text-white/50 hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-4", children: messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`, children: [
            msg.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl mr-2 mt-1", children: "🍿" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${msg.role === "assistant" ? "bg-white/10 text-white/90 rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_15px_rgba(var(--primary),0.3)]"}`, children: msg.text })
          ] }, i)) }),
          messages.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-2 flex flex-wrap gap-2", children: ["Recommend a thriller", "Easy weekend watch"].map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setInput(chip);
                handleSend();
              },
              className: "text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors",
              children: chip
            },
            chip
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-white/10 bg-black/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 focus-within:border-primary/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Type a mood...",
                className: "flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-white/40 hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !input.trim(), className: "text-primary disabled:opacity-50 hover:text-primary/80 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }) })
          ] }) })
        ]
      }
    )
  ] }) });
}
function reelToast(message) {
  toast(message, {
    duration: 3200,
    className: "reel-toast",
    style: {
      background: "var(--reel)",
      color: "var(--reel-foreground)",
      border: "none",
      fontFamily: "var(--font-display)",
      fontSize: "0.95rem",
      letterSpacing: "-0.01em",
      padding: "0.9rem 1.1rem",
      borderRadius: "0.75rem",
      boxShadow: "0 12px 40px -10px color-mix(in oklab, var(--foreground) 25%, transparent)"
    }
  });
}
const ADD_LINES = {
  "john-wick": { "pulse-chaser": "Iconic. Locked in." },
  coco: { empath: "Bring tissues. You'll thank me." },
  inception: {
    "void-gazer": "This one rewards a second watch more than the first.",
    "pulse-chaser": "Solid pick. Moves the whole time.",
    empath: "It'll make you feel a lot without warning you.",
    architect: "Every frame is load-bearing. Nice choice."
  }
};
const ADD_FALLBACK = {
  "void-gazer": (m) => `${m.title}. Patient choice.`,
  "pulse-chaser": (m) => `${m.title}. Locked in.`,
  empath: (m) => `${m.title} — that one's got a heart.`,
  architect: (m) => `${m.title}. Clean addition.`
};
const VERDICT_FALLBACK = {
  acquitted: {
    "void-gazer": "Earned its runtime.",
    "pulse-chaser": "Delivered. Next.",
    empath: "Glad you spent the evening with it.",
    architect: "Tightly built. Verdict noted."
  },
  guilty: {
    "void-gazer": "No shame in a quiet pleasure.",
    "pulse-chaser": "Exactly what it needed to be.",
    empath: "Loved for what it was. That counts.",
    architect: "Genre did its job. Moving on."
  },
  life: {
    "void-gazer": "That film stays in the body.",
    "pulse-chaser": "Didn't expect it to hit that hard, did you.",
    empath: "One of the most human films ever made.",
    architect: "A masterwork. Logged for keeps."
  },
  contempt: {
    "void-gazer": "A fair ruling. Moving on.",
    "pulse-chaser": "That one hurt a lot of people.",
    empath: "You're not wrong. It took something from everyone.",
    architect: "The structure didn't hold. Honest call."
  }
};
const MOOD_PICK_LINES = {
  "void-gazer": (m) => `${m.title}. Sit with it.`,
  "pulse-chaser": (m) => `${m.title}. Press play.`,
  empath: (m) => `${m.title}. It'll meet you where you are.`,
  architect: (m) => `${m.title}. Clean choice for tonight.`
};
const EMPTY_WATCHLIST = {
  "void-gazer": "Nothing yet. Bring me something worth waiting for.",
  "pulse-chaser": "Empty stack. Add something — I'll work fast.",
  empath: "Add something first — I work with what you've got.",
  architect: "Need inputs. Add a film and I'll do the rest."
};
const REEL_INTRO = {
  "void-gazer": "Hey. Before we start — let me figure out what kind of movie person you are. Seven choices. No wrong answers.",
  "pulse-chaser": "Quick one. Seven taps. No wrong answers. Let's go.",
  empath: "Hi. I want to know you a little before we start. Seven questions. Just go with your gut.",
  architect: "Calibrating. Seven binaries. Pick fast — first instinct is the data I want."
};
const reel = {
  intro: (a) => REEL_INTRO[a],
  add: (a, m) => ADD_LINES[m.id]?.[a] ?? ADD_FALLBACK[a](m),
  verdict: (a, v) => VERDICT_FALLBACK[v][a],
  moodPick: (a, m) => MOOD_PICK_LINES[a](m),
  emptyWatchlist: (a) => EMPTY_WATCHLIST[a],
  verdictsStick: () => "Verdicts stick. You felt what you felt."
};
function MovieDetailPanel() {
  const { archetype, detailMovieId, setDetailMovieId, hasMovie, addMovie } = useCineVault();
  const movie = detailMovieId ? MOVIES.find((m) => m.id === detailMovieId) : null;
  if (!movie || !archetype) return null;
  const inWatchlist = hasMovie(movie.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!detailMovieId, onOpenChange: (open) => !open && setDetailMovieId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full md:min-w-[500px] lg:min-w-[600px] p-0 bg-black border-l border-white/10 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "sr-only", children: [
      movie.title,
      " Details"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[16/9]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: movie.poster, alt: "", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white ml-1" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 md:px-10 pb-20 relative z-20 -mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-end mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: movie.poster, alt: movie.title, className: "w-28 md:w-36 rounded-xl shadow-2xl border border-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-white mb-2", children: movie.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/60 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              " ",
              movie.year
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              " ",
              movie.runtime,
              "m"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: movie.genres.join(", ") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-8", children: [
        inWatchlist ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: true, className: "flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/10 text-white font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-primary" }),
          " In Vault"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              addMovie(movie.id);
              reelToast(reel.add(archetype, movie));
            },
            className: "flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
              " Add to Watchlist"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-sm md:text-base leading-relaxed mb-10", children: [
        movie.blurb,
        " A cinematic masterpiece that redefines its genre. ",
        movie.title,
        " takes you on an unforgettable journey."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-white mb-4", children: "Where to Watch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-bold text-xs tracking-tighter", children: "N" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/50 uppercase tracking-widest mb-0.5", children: "Subscription" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Netflix" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-xs", children: "P" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/50 uppercase tracking-widest mb-0.5", children: "Rent / Buy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-white", children: "Prime Video" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-white mb-4", children: "Cast & Crew" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 hide-scrollbar", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 w-20 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/10 mb-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://api.dicebear.com/7.x/notionists/svg?seed=${movie.id}${i}`, alt: "Actor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-white truncate", children: "Actor Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/50 truncate", children: "Character" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
          " Discussions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/80", children: "Cinophile99" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: "Absolutely stunning visuals. Deserves a LIFE SENTENCE verdict." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, { className: "w-4 h-4 text-white/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Add a thought...", className: "flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 text-white" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function UserIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "7", r: "4" })
  ] });
}
const DEMO_SEED = [
  "inception",
  "moonlight",
  "knives-out",
  "arrival",
  "john-wick",
  "coco",
  "the-grand-budapest",
  "everything-everywhere"
];
function AppShell({ children }) {
  const { archetypeData, reset, setArchetype, seedDemo } = useCineVault();
  const location = useLocation();
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh flex flex-col bg-background text-foreground selection:bg-primary/30 pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed top-0 left-0 right-0 z-40 hidden md:flex items-center justify-between px-8 py-4 mx-auto w-full max-w-screen-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/50 backdrop-blur-xl border-b border-border shadow-sm rounded-b-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "relative flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Popcorn, { className: "w-7 h-7 text-primary group-hover:scale-110 transition-transform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold tracking-tight text-white drop-shadow-md", children: "CineVault" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-8 bg-black/40 px-8 py-3 rounded-full border border-white/10 backdrop-blur-lg shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/", label: "Home", active: location.pathname === "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/browse", label: "Browse", active: location.pathname === "/browse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/search", label: "Search", active: location.pathname === "/search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/watchlist", label: "Watchlist", active: location.pathname === "/watchlist" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "aria-label": "Settings",
              className: "rounded-full p-2 text-white/50 hover:text-white transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "bg-black/90 backdrop-blur-xl border-l border-white/10 text-white z-[100]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-white", children: "Demo controls" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "text-white/50", children: "Switch archetype to see the app re-skin instantly." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-2", children: ARCHETYPE_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setArchetype(id);
                  setOpen(false);
                },
                className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: ARCHETYPES[id].name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: ARCHETYPES[id].tagline })
                ]
              },
              id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: () => {
                seedDemo(DEMO_SEED);
                setOpen(false);
              }, children: "Seed 8 demo films" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "text-white/50 hover:text-white", onClick: () => {
                reset();
                setOpen(false);
                window.location.href = "/";
              }, children: "Reset everything" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", className: "w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-white/20 shadow-lg hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-white" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full mx-auto md:pt-24", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopChat, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MovieDetailPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur-xl pb-safe", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch justify-around px-2 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTab, { to: "/", label: "Home", Icon: House, active: location.pathname === "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTab, { to: "/browse", label: "Browse", Icon: Film, active: location.pathname === "/browse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTab, { to: "/search", label: "Search", Icon: Search, active: location.pathname === "/search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTab, { to: "/watchlist", label: "Vault", Icon: Library, active: location.pathname === "/watchlist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTab, { to: "/profile", label: "Profile", Icon: User, active: location.pathname === "/profile" })
    ] }) })
  ] });
}
function NavLink({ to, label, active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: `text-sm font-medium transition-colors relative ${active ? "text-white" : "text-white/60 hover:text-white"}`,
      children: [
        label,
        active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),1)]" })
      ]
    }
  );
}
function MobileTab({ to, label, Icon: Icon2, active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: `flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium tracking-wide transition-colors ${active ? "text-primary" : "text-white/40 hover:text-white/80"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: `h-5 w-5 ${active ? "drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" : ""}` }),
        label
      ]
    }
  );
}
export {
  AppShell as A,
  Clock as C,
  Film as F,
  MOVIES as M,
  Popcorn as P,
  Sheet as S,
  Play as a,
  SheetContent as b,
  createLucideIcon as c,
  SheetHeader as d,
  SheetTitle as e,
  Search as f,
  Mic as g,
  Plus as h,
  reel as i,
  Calendar as j,
  reelToast as r
};
