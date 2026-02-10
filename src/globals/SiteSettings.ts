import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    admin: {
        group: 'Settings',
    },
    access: {
        read: () => true, // Accessible by everyone (for middleware check)
        update: ({ req: { user } }) => {
            // Allow update only if user has 'admin' role
            return user?.role === 'admin'
        },
    },
    fields: [
        {
            name: 'maintenance',
            type: 'group',
            label: 'Maintenance Mode',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Enable Maintenance Mode',
                    defaultValue: false,
                    admin: {
                        description: 'If enabled, only logged-in users will be able to access the site.',
                    },
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Maintenance Page Title',
                    defaultValue: 'We are currently under maintenance',
                    admin: {
                        condition: (_, siblingData) => siblingData.enabled,
                    },
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Maintenance Page Description',
                    defaultValue: 'Please check back later.',
                    admin: {
                        condition: (_, siblingData) => siblingData.enabled,
                    },
                },
            ],
        },
    ],
}
