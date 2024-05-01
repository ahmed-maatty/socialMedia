import React from 'react';
import {Box} from "@mui/material";


const UserImage = ({Image , size = "60px"}) => {
    return (
        <Box width={size} height={size}>
            <img
                width={size}
                height={size}
                style={{objectFit:"cover" , borderRadius:"50%"}}
                alt="User"
                src={Image}
            />
        </Box>
    )
}

export default UserImage;