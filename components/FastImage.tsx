import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const FastImage = ({ source, ...props }) => {
  const [uri, setUri] = useState(source.uri);
  const srcuri = uri.split('/').pop();
  console.log(srcuri);
  //uri주소를 '/'기준으로 잘라냄 -> 배열값으로 출력됨 -> .pop는 잘라낸 마지막 값을 사용함

  useEffect(() => {
    (async () => {
      try {
        const hashed = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256, //알고리즘형식, 기종에 따라 지원하는 형식이 다름, SHA256이 그나마 맘ㄶ은 형식 지원함, 똑같은 값이 나오지 않도록 방지. 이 값을 통해 주ㅗ값을 만듬
          source.uri
        );
        const fileSystemUri = `${FileSystem.documentDirectory}${srcuri}`; //도큐멘트디렉토리는 물리적으로, 캐시디렉토리는 메모리상으로 위치를 잡아줌

        const metadata = await FileSystem.getInfoAsync(fileSystemUri);
        if (!metadata.exists) {
          //만약 데이터가 없다면 해당 주소에 이미지를 다운로드해서 저장
          await FileSystem.downloadAsync(source.uri, fileSystemUri);
        }
        console.log(
          'hashed 값은: ',
          hashed,
          '파일시스템주소는: ',
          fileSystemUri
        );
        console.log('metadata 값은: ', metadata);
        setUri(fileSystemUri);
      } catch (e) {
        console.log('소스주소는: ', source.uri);
        setUri(source.uri);
      }
    })();
  }, [source.uri]);

  return <Image source={{ uri }} {...props} />;
};

FastImage.propTypes = {
  source: PropTypes.object.isRequired,
};

export default FastImage;
