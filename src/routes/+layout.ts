import type { LayoutLoad } from './$types'

export const load: LayoutLoad = () => {
  return {
    sections: [
      { slug: 'app/editor', title: 'Editor' },
      { slug: 'app/webhooks', title: 'Webhooks' },
      { slug: 'app/profiles', title: 'Profiles' },
    ],
  }
}
