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
        //Phòng khám
        name: "menu.clinic",
        menus: [
            {
                name: "menu.manage-clinic",
                link: "/system/clinic-manage",
            },
        ],
    },
    {
        //Chuyên khoa
        name: "menu.specialty",
        menus: [
            {
                name: "menu.manage-specialty",
                link: "/system/specialty-manage",
            },
        ],
    },
    {
        //Cẩm nang
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
            {
                name: "menu.manage-doctor.manage-confirm-schedule",
                link: "/system/schedule-confirm-manage",
            },
        ],
    },
];
