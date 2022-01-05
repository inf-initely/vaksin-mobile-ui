import { Heading, Link, VStack, Text } from '@chakra-ui/react'
import { apiToValue, valueToUrl } from 'Functions/regionValueNormalizer'
import { defaults } from 'lodash-es'
import { useMemo } from 'react'
import { Link as RouterLink, useLocation, useMatch } from 'react-router-dom'
import type { City } from 'types/api'

function DropdownItem(
  props: Parameters<typeof Link>[0] & {
    city: City
    // shouldGiveFocusOnPageChange: boolean
  },
) {
  const {
    city,
    // shouldGiveFocusOnPageChange,
    ...rest
  } = props

  // to generate url, we need to convert api value to display value
  // then from display value to url value
  const displayValue = useMemo(() => apiToValue(city), [city])
  const urlValue = useMemo(() => valueToUrl(displayValue), [displayValue])
  return (
    <Link
      as={RouterLink}
      to={`/${urlValue.province}/${urlValue.city}`}
      sx={{
        '&:first-of-type :first-of-type': {
          borderTop: 'none',
        },
      }}
      tabIndex={0}
      // state={{
      //   value: city,
      //   focus: false,
      // }}
      {...rest}
    >
      <VStack
        spacing={0}
        alignItems="flex-start"
        // bgColor="red"
        width="full"
        py={1}
        borderTop="1px solid"
        borderTopColor="gray.200"
        pl={4}
      >
        <Heading size="sm">{displayValue.city}</Heading>
        <Text>{displayValue.province}</Text>
      </VStack>
    </Link>
  )
}

export default function CityDropdown(
  props: Parameters<typeof VStack>[0] & {
    data: City[]
    onClickItem?: (city: City, e: React.MouseEvent) => void
  },
) {
  const { data, onClickItem, ...rest } = defaults(props, {
    onClickItem: () => {},
  })
  const { pathname } = useLocation()
  // const isListPage = useMatch(':province/:city')
  // console.log(isListPage)
  return (
    <VStack
      position="absolute"
      top="100%"
      width="100%"
      zIndex="hide"
      // bgColor="red"
      transform="translateY(-0.5em)"
      border="1px solid"
      borderColor="gray.200"
      borderBottomRadius="md"
      bgColor="white"
      boxShadow="md"
      pt={3}
      alignItems="stretch"
      spacing={0}
      {...rest}
    >
      {data.map((city, i) => (
        <DropdownItem
          city={city}
          key={i}
          // shouldGiveFocusOnPageChange={isListPage ? false : true}
          onClick={(e) => {
            console.log('fuc', onClickItem)
            onClickItem(city, e)
          }}
        />
      ))}
    </VStack>
  )
}