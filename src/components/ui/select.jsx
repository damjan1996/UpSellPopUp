import React, { createContext, useContext, useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils.js"
import { Check, ChevronDown } from "lucide-react"

const SelectContext = createContext({})

const Select = ({ children, value, onValueChange, defaultValue }) => {
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value)
        }
    }, [value])

    const handleSelect = (val) => {
        setSelectedValue(val)
        if (onValueChange) {
            onValueChange(val)
        }
        setOpen(false)
    }

    return (
        <SelectContext.Provider
            value={{
                value: selectedValue,
                onSelect: handleSelect,
                open,
                setOpen,
            }}
        >
            {children}
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen } = useContext(SelectContext)

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
})

SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
    const { value } = useContext(SelectContext)

    return (
        <span className={cn("flex-1 truncate", className)} {...props} ref={ref}>
            {value || placeholder}
        </span>
    )
})

SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen } = useContext(SelectContext)
    const contentRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleOutsideClick)
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [open, setOpen])

    if (!open) return null

    return (
        <div
            ref={contentRef}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
                className,
            )}
            {...props}
        >
            <div className="p-1">{children}</div>
        </div>
    )
})

SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onSelect } = useContext(SelectContext)
    const isSelected = selectedValue === value

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                isSelected ? "bg-accent text-accent-foreground" : "",
                className,
            )}
            onClick={() => onSelect(value)}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    )
})

SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }