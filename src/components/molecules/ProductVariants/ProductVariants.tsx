'use client';

import { HttpTypes } from '@medusajs/types';

import { Chip } from '@/components/atoms';
import useUpdateSearchParams from '@/hooks/useUpdateSearchParams';

export const ProductVariants = ({
  product,
  selectedVariant,
}: {
  product: HttpTypes.StoreProduct;
  selectedVariant: Record<string, string>;
}) => {
  const updateSearchParams = useUpdateSearchParams();

  // update the options when a variant is selected
  const setOptionValue = (
    optionId: string,
    value: string
  ) => {
    updateSearchParams(optionId, value);
  };

  return (
    <div className='my-4 space-y-2'>
      {!product.options || product.options.length < 2 ? (
        <div className='h-10' />
      ) : (
        (product.options || []).map(
          ({ id, title, values }) => (
            <div key={id}>
              <span className='label-md text-secondary'>
                {title}:{' '}
              </span>
              <span className='label-md text-primary'>
                {selectedVariant[title.toLowerCase()]}
              </span>
              <div className='flex gap-2 mt-2'>
                {(values || []).map(({ id, value }) => (
                  <Chip
                    key={id}
                    selected={
                      selectedVariant[
                        title.toLowerCase()
                      ] === value
                    }
                    color={title === 'Color'}
                    value={value}
                    onSelect={() =>
                      setOptionValue(
                        title.toLowerCase(),
                        value
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};
