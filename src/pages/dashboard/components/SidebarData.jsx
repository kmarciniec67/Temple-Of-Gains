import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io5"

export const SidebarData = [
    {
        title: 'STRONA GŁÓWNA',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'navText'
    },
    {
        title: 'POMIARY',
        path: 'measurement',
        icon: <IoIcons.IoScale />,
        cName: 'navText'
    },
    {
        title: 'PLANY TRENINGOWE',
        path: 'plans',
        icon: <IoIcons.IoReader />,
        cName: 'navText'
    },
    {
        title: 'BAZA ĆWICZEŃ',
        path: 'exercises',
        icon: <IoIcons.IoBook />,
        cName: 'navText'
    },
    {
        title: 'HISTORIA',
        path: 'history',
        icon: <IoIcons.IoCalendar />,
        cName: 'navText'
    },
    {
        title: 'USTAWIENIA',
        path: 'settings',
        icon: <IoIcons.IoSettings/>,
        cName: 'navText'
    }
    
]