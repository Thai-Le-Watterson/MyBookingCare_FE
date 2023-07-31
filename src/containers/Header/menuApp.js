export const adminMenu = [
    {
        //hệ thống
        name: "menu.admin",
        menus: [
            {
                name: "menu.manage-admin.crud-user",
                link: "/system/user-manage",
            },
            {
                name: "menu.manage-admin.crud-redux",
                link: "/system/user-redux-manage",
            },
            {
                name: "menu.manage-admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                name: "menu.manage-doctor.manage-schedule",
                link: "/system/schedule-manage",
            },
        ],
    },
    {
        //hệ thống
        name: "menu.clinic",
        menus: [
            {
                name: "menu.manage-clinic",
                link: "/system/clinic-manage",
            },
        ],
    },
    {
        //hệ thống
        name: "menu.specialy",
        menus: [
            {
                name: "menu.manage-specialy",
                link: "/system/specialy-manage",
            },
        ],
    },
    {
        //hệ thống
        name: "menu.handbook",
        menus: [
            {
                name: "menu.manage-handbook",
                link: "/system/handbook-manage",
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: "menu.doctor",
        menus: [
            {
                name: "menu.manage-doctor.manage-schedule",
                link: "/system/schedule-manage",
            },
        ],
    },
];
