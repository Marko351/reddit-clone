import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  // console.log(router);
  useEffect(() => {
    if (!data?.me && !loading) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [loading, data]);
};
