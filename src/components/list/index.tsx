import {Music} from "@/constants/music";
import {Avatar, List} from "antd";
import React from "react";

const ListSongs: React.FC<{
    onClick: (item: any) => any
}> = ({onClick}) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={Music}
            header={'Songs List'}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item?.thumbnail}/>}
                        title={<div className={'cursor-pointer'} onClick={() => {
                            onClick(item)
                        }}>{item?.name}</div>}
                    />
                </List.Item>
            )}
        />
    )
}

export default ListSongs;
