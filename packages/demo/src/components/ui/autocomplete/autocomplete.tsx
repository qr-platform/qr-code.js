import { ForwardedRef, ReactElement } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Listbox } from '@heroui/listbox'
import { FreeSoloPopover } from '@heroui/popover'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { ChevronDownIcon, CloseIcon } from '@heroui/shared-icons'
import { forwardRef } from '@heroui/system'
import { AnimatePresence } from 'framer-motion'

import { useAutocomplete, UseAutocompleteProps } from './use-autocomplete'

interface Props<T> extends UseAutocompleteProps<T> {}

export type AutocompleteProps<T extends object = object> = Props<T>

const Autocomplete = forwardRef(function Autocomplete<T extends object>(
  props: AutocompleteProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    Component,
    isOpen,
    disableAnimation,
    selectorIcon = <ChevronDownIcon />,
    clearIcon = <CloseIcon />,
    endContent,
    getBaseProps,
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getEmptyPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
    classNames
  } = useAutocomplete<T>({ ...props, ref })

  const listboxProps = getListBoxProps()

  const popoverContent = isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <ScrollShadow {...getListBoxWrapperProps()}>
        <Listbox {...listboxProps} />
      </ScrollShadow>
    </FreeSoloPopover>
  ) : listboxProps.state?.collection.size === 0 ? (
    <div {...getEmptyPopoverProps()} />
  ) : null

  // Get input props and merge with any classNames
  const inputProps = getInputProps()
  const mergedClassNames = {
    ...inputProps.classNames,
    label: classNames?.label || inputProps.classNames?.label
  }

  return (
    <Component {...getBaseProps()}>
      <Input
        {...inputProps}
        classNames={mergedClassNames}
        endContent={
          <div {...getEndContentWrapperProps()}>
            {endContent || <Button {...getClearButtonProps()}>{clearIcon}</Button>}
            <Button {...getSelectorButtonProps()}>{selectorIcon}</Button>
          </div>
        }
      />
      {disableAnimation ? (
        popoverContent
      ) : (
        <AnimatePresence>{popoverContent}</AnimatePresence>
      )}
    </Component>
  )
}) as <T extends object>(props: AutocompleteProps<T>) => ReactElement

export default Autocomplete
