import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import ProfileFieldCard from 'src/componet/ProfileFieldCard';

const Profile = () => {
    
    const seller = {
        profile: {
            imageUrl: "",
            storeName: "",
            email: "",
            phoneNumber: "",
            businessName: "",
            gstin: "",
            accountStatus: "",
            pickupAddress: {
                address: "",
                city: "",
                phoneNumber: ""
            },
            bankDetails: {
                accountHolderName: "",
                accountNumber: "",
                bankCode: ""
            }
        }
    };
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-medium text-gray-700">個人資料</h2>
                    <IconButton
                        sx={{
                            backgroundColor: '#00a99d',
                            '&:hover': { backgroundColor: '#00968b' },
                            color: 'white',
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                        <img
                            src={seller?.profile?.imageUrl || "https://cdn.pixabay.com/photo/2023/11/08/04/30/girl-8373900_1280.jpg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <ProfileFieldCard
                        keys="店家名稱"
                        value={seller?.profile?.storeName}
                    />
                    <ProfileFieldCard
                        keys="店家電子信箱"
                        value={seller?.profile?.email}
                    />
                    <ProfileFieldCard
                        keys="店家手機"
                        value={seller?.profile?.phoneNumber}
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-medium text-gray-700">商業資訊</h2>
                    <IconButton
                        sx={{
                            backgroundColor: '#00a99d',
                            '&:hover': { backgroundColor: '#00968b' },
                            color: 'white',
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>

                <div className="space-y-1">
                    <ProfileFieldCard
                        keys="品牌名稱/商號名稱"
                        value={seller?.profile?.businessName}
                    />
                    <ProfileFieldCard
                        keys="統一編號"
                        value={seller?.profile?.gstin}
                    />
                    <ProfileFieldCard
                        keys="帳戶狀態"
                        value={seller?.profile?.accountStatus || "待審核"}
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-medium text-gray-700">取貨地址</h2>
                    <IconButton
                        sx={{
                            backgroundColor: '#00a99d',
                            '&:hover': { backgroundColor: '#00968b' },
                            color: 'white',
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>

                <div className="space-y-1">
                    <ProfileFieldCard
                        keys="地址"
                        value={seller?.profile?.pickupAddress?.address}
                    />
                    <ProfileFieldCard
                        keys="城市"
                        value={seller?.profile?.pickupAddress?.city}
                    />
                    <ProfileFieldCard
                        keys="聯絡手機"
                        value={seller?.profile?.pickupAddress?.phoneNumber}
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-medium text-gray-700">銀行帳戶資訊</h2>
                    <IconButton
                        sx={{
                            backgroundColor: '#00a99d',
                            '&:hover': { backgroundColor: '#00968b' },
                            color: 'white',
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>

                <div className="space-y-1">
                    <ProfileFieldCard
                        keys="帳戶持有人名稱"
                        value={seller?.profile?.bankDetails?.accountHolderName}
                    />
                    <ProfileFieldCard
                        keys="帳戶號碼"
                        value={seller?.profile?.bankDetails?.accountNumber}
                    />
                    <ProfileFieldCard
                        keys="銀行代碼"
                        value={seller?.profile?.bankDetails?.bankCode || "待審核"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
