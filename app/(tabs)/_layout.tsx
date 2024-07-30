import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
//
const TabLayout = () => {
  return (
    // name="/" 레이아웃 기준의... 루트? 루트경로.기본 탭 화면
    // headerShown:false -> 헤더사라짐
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index" //name이름은 파일이름이랑 같아야됨
        options={{
          title: 'Home',
          headerShown: true, //header 보여짐

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ListScreen"
        options={{
          title: 'List',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SelectPhotosScreen"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'add' : 'add-outline'} //아이콘이름 바꾸기
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
