import React from 'react'
import { createBehavior, createResource } from '@designable-v5/core'
import { DnFC } from '@designable-v5/react'
import { createFieldSchema } from '../Field'
import { Container } from '../../common/Container'
import { AllLocales } from '../../locales'

export const ObjectContainer: DnFC<React.ComponentProps<typeof Container>> =
  Container
ObjectContainer.Behavior = createBehavior({
  name: 'Object',
  extends: ['Field'],
  selector: (node) => node.props.type === 'object',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(),
  },
  designerLocales: AllLocales.ObjectLocale,
})

ObjectContainer.Resource = createResource({
  icon: 'ObjectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
      },
    },
  ],
})
